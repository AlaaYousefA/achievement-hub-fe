import fetchService from 'src/services/FetchService';

const CONSTANTS = {
  USERS_SERVICE: 'api/v1/users',
};

export class UsersService {
  async get(id) {
    try {
      const user = await fetchService.request(
        `${CONSTANTS.USERS_SERVICE}/${id}`,
        {
          method: 'GET',
        },
        true
      );

      return user;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }

  async getAll(page, size, sortBy, sortDirection, filters = undefined) {
    try {
      let endpoint = `${CONSTANTS.USERS_SERVICE}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`;

      if (filters) {
        if (filters.filterDepartment && filters.filterDepartment?.length > 0) {
          endpoint += `&department=${encodeURIComponent(filters.filterDepartment.join(','))}`;
        }

        if (filters.filterRole && filters.filterRole?.length > 0) {
          endpoint += `&kasitRole=${encodeURIComponent(filters.filterRole.join(','))}`;
        }

        if (filters.filterName) {
          endpoint += `&name=${encodeURIComponent(filters.filterName)}`;
        }

        if (filters.filterAchievementNo) {
          let number;
          const filterAchievementNo = filters.filterAchievementNo;

          if (
            !isNaN(filterAchievementNo) &&
            filterAchievementNo !== null &&
            filterAchievementNo !== undefined &&
            filterAchievementNo !== ''
          ) {
            number = Number(filterAchievementNo);
            endpoint += `&achNo=${encodeURIComponent(number)}`;
          } else {
            console.log('cant parse number');
            throw new Error('filterAchievementNo is not a number');
          }
        }
      }

      const users = await fetchService.request(
        endpoint,
        {
          method: 'GET',
        },
        true
      );

      return users;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return null;
      }

      throw error;
    }
  }

  async upgrade(username, roles) {
    try {
      await fetchService.request(
        `${CONSTANTS.USERS_SERVICE}/upgrade-idm?username=${username}&roles=${roles}`,
        {
          method: 'PUT',
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
}

export default new UsersService();
