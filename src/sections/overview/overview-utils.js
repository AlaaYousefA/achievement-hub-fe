import achievementCategories from 'src/static/categories';
import departments from 'src/static/departments';

//////// ADMIN FUNCTIONS

export const generateRadarChartDataForAdmin = (users, achievements) => {
  const categories = achievementCategories;
  const series = departments.map((department) => {
    const data = categories.map((category) => {
      const count = achievements.filter((achievement) => {
        const user = users.find((user) => user.id === achievement.userId);
        return user && user.department === department && achievement.category === category;
      }).length;

      return count;
    });

    return {
      name: department,
      data: data,
    };
  });

  return {
    categories: categories,
    series: series,
  };
};

export const generatePieChartDateForAdmin = (users) => {
  const series = departments.map((department) => {
    const departmentUsers = users.filter((user) => user.department === department);
    const totalAchievements = departmentUsers.reduce(
      (sum, user) => sum + (user.achievementCount || 0),
      0
    );

    return {
      label: department,
      value: totalAchievements,
    };
  });

  return series;
};

export const generateLineChartLabels = (year) => {
  return [
    `01/01/${year}`,
    `02/01/${year}`,
    `03/01/${year}`,
    `04/01/${year}`,
    `05/01/${year}`,
    `06/01/${year}`,
    `07/01/${year}`,
    `08/01/${year}`,
    `09/01/${year}`,
    `10/01/${year}`,
    `11/01/${year}`,
    `12/01/${year}`,
  ];
};

export const generateLineChartDataForAdmin = (achievements, users, year) => {
  const series = departments.map((department) => {
    const monthlyData = new Array(12).fill(0);

    achievements
      .filter((achievement) => {
        const user = users.find((user) => user.id === achievement.userId);
        return user && user.department === department;
      })
      .forEach((achievement) => {
        const achievementDate = new Date(achievement.createdAt);
        if (achievementDate.getFullYear() === parseInt(year, 10)) {
          const month = achievementDate.getMonth();
          if (month < 12) {
            monthlyData[month]++;
          }
        }
      });

    return {
      name: department,
      type: 'column',
      fill: 'solid',
      data: monthlyData,
    };
  });

  const achievementsMonthlyData = new Array(12).fill(0);
  achievements.forEach((achievement) => {
    const achievementDate = new Date(achievement.createdAt);
    if (achievementDate.getFullYear() === parseInt(year, 10)) {
      const month = achievementDate.getMonth();
      if (month < 12) {
        achievementsMonthlyData[month]++;
      }
    }
  });

  return [
    {
      name: 'Achievements',
      type: 'line',
      fill: 'solid',
      data: achievementsMonthlyData,
    },
    ...series,
  ];
};

//////// USER FUNCTIONS

export const generateRadarChartDataForUser = (achievements) => {
  const categories = achievementCategories;

  const data = categories.map((category) => {
    const count = achievements.filter((achievement) => achievement.category === category).length;
    return count;
  });

  const series = [
    {
      name: 'Achievements by Category',
      data: data,
    },
  ];

  return {
    categories: categories,
    series: series,
  };
};

export const generatePieChartDataForUser = (achievements) => {
  const series = achievementCategories.map((category) => {
    const totalAchievements = achievements.filter(
      (achievement) => achievement.category === category
    ).length;

    return {
      label: category,
      value: totalAchievements,
    };
  });

  return series;
};
export const generateLineChartDataForUser = (achievements, year) => {
  const series = achievementCategories.map((category) => {
    const monthlyData = new Array(12).fill(0);

    achievements
      .filter((achievement) => achievement.category === category)
      .forEach((achievement) => {
        const achievementDate = new Date(achievement.createdAt);
        if (achievementDate.getFullYear() === parseInt(year, 10)) {
          const month = achievementDate.getMonth();
          if (month < 12) {
            monthlyData[month]++;
          }
        }
      });

    return {
      name: category,
      type: 'column',
      fill: 'solid',
      data: monthlyData,
    };
  });

  const achievementsMonthlyData = new Array(12).fill(0);
  achievements.forEach((achievement) => {
    const achievementDate = new Date(achievement.createdAt);
    if (achievementDate.getFullYear() === parseInt(year, 10)) {
      const month = achievementDate.getMonth();
      if (month < 12) {
        achievementsMonthlyData[month]++;
      }
    }
  });

  return [
    {
      name: 'Total Achievements',
      type: 'line',
      fill: 'solid',
      data: achievementsMonthlyData,
    },
    ...series,
  ];
};
