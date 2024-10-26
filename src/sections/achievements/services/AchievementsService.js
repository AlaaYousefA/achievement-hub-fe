import fetchService from 'src/services/FetchService';

const CONSTANTS = {
  ACHIEVEMENTS_ENDPOINT: 'api/v1/achievements',
};

export class AchievementsService {
  async add(achievement) {
    try {
      await fetchService.request(
        CONSTANTS.ACHIEVEMENTS_ENDPOINT,
        {
          method: 'POST',
          body: JSON.stringify(achievement),
        },
        true
      );

      return true;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return false;
      }

      throw error;
    }
  }

  async get(id) {
    try {
      const achievement = await fetchService.request(
        `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}/${id}`,
        {
          method: 'GET',
        },
        true
      );

      return achievement;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }

  async getAll(page, size, sortBy, sortDirection, filters = undefined) {
    try {
      let endpoint = `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`;

      if (filters) {
        if (filters.filterName) {
          endpoint += `&name=${encodeURIComponent(filters.filterName)}`;
        }

        if (filters.filterCategory && filters.filterCategory?.length > 0) {
          endpoint += `&category=${encodeURIComponent(filters.filterCategory.join(','))}`;
        }

        if (filters.filterStatus && filters.filterStatus?.length > 0) {
          filters.filterStatus = filters.filterStatus.map((status) => {
            return status.toUpperCase();
          });
          endpoint += `&status=${encodeURIComponent(filters.filterStatus.join(','))}`;
        }

        if (filters.filterTime) {
          endpoint += `&time=${encodeURIComponent(filters.filterTime)}`;
        }

        if (filters.filterUser) {
          endpoint += `&userIdf=${encodeURIComponent(filters.filterUser)}`;
        }

        if (filters.filterTitle) {
          endpoint += `&title=${encodeURIComponent(filters.filterTitle)}`;
        }
      }

      const achievements = await fetchService.request(endpoint, { method: 'GET' }, true);

      return achievements;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }

  async getAllForUser(userId, page, size) {
    try {
      const achievements = await fetchService.request(
        `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}/user?userId=${userId}&page=${page}&size=${size}`,
        {
          method: 'GET',
        },
        true
      );

      return achievements;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }

  async update(achievementId, achievementRequest) {
    try {
      await fetchService.request(
        `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}/${achievementId}`,
        {
          method: 'PUT',
          body: JSON.stringify(achievementRequest),
        },
        true
      );

      return true;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return false;
      }

      throw error;
    }
  }

  async delete(id) {
    try {
      const achievement = await fetchService.request(
        `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}/${id}`,
        {
          method: 'DELETE',
        },
        true
      );

      return achievement;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return false;
      }

      throw error;
    }
  }

  async approve(id) {
    try {
      const achievement = await fetchService.request(
        `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}/${id}/approve`,
        {
          method: 'PUT',
        },
        true
      );

      return achievement;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }

  async reject(id, message) {
    try {
      const achievement = await fetchService.request(
        `${CONSTANTS.ACHIEVEMENTS_ENDPOINT}/${id}/reject`,
        {
          method: 'PUT',
          body: JSON.stringify({ message }),
        },
        true
      );

      return achievement;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }
}

export default new AchievementsService();
