import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import PieChart from '../pie-chart';
import LineChart from '../line-chart';
import AppWidgetSummary from '../app-widget-summary';
import RadarChart from '../radar-chart';

import AchievementsService from '../../achievements/services/AchievementsService';
import UsersService from '../../user/services/UsersService';
import AuthenticationService from 'src/security/AuthenticationService';

import {
  generateRadarChartDataForAdmin,
  generatePieChartDateForAdmin,
  generateLineChartLabels,
  generateLineChartDataForAdmin,
  generateLineChartDataForUser,
  generatePieChartDataForUser,
  generateRadarChartDataForUser,
} from '../overview-utils';

// ----------------------------------------------------------------------

const CONSTANTS = {
  ADMIN_LINE_CHART_SUB_HEADER:
    'Shows for each department the monthly achievements for the current year',
  ADMIN_PIE_CHART_SUB_HEADER: 'Shows the number of achievements for each department',
  ADMIN_RADAR_CHART_SUB_HEADER:
    'Shows for each department what is the most achievements done for each category',
  USER_LINE_CHART_SUB_HEADER: '',
  USER_PIE_CHART_SUB_HEADER: '',
  USER_RADAR_CHART_SUB_HEADER: '',
};

export default function AppView() {
  const isAdmin = AuthenticationService.isAdminOrSubAdmin();
  const [year, setYear] = useState(new Date().getFullYear());
  const [achievements, setAchievements] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAchievementsAndUsers = async () => {
      try {
        const authenticatedUser = await AuthenticationService.loadAuthenticatedUser();

        if (!authenticatedUser) {
          console.error('Failed to load authenticated user');
          return;
        }

        const achievementsData = isAdmin
          ? await AchievementsService.getAll(0, 20000, 'createdAt', 'desc')
          : await AchievementsService.getAllForUser(authenticatedUser.id, 0, 20000);

        const usersData = isAdmin
          ? await UsersService.getAll(0, 20000, 'name', 'asc')
          : authenticatedUser;

        const usersWithAchievementCount = isAdmin
          ? await Promise.all(
              usersData.content.map(async (user) => {
                const userAchievements = await AchievementsService.getAllForUser(user.id, 0, 20000);
                const approvedAchievementsCount = userAchievements.content.filter(
                  (achievement) => achievement.status === 'APPROVED'
                ).length;
                return { ...user, achievementCount: approvedAchievementsCount };
              })
            )
          : [
              {
                ...usersData,
                achievementCount: achievementsData?.content.filter(
                  (achievement) => achievement.status === 'APPROVED'
                ).length,
              },
            ];

        console.log(achievementsData);
        const approvedAchievements =
          achievementsData?.content.filter((achievement) => achievement.status === 'APPROVED') ||
          [];

        setAchievements(approvedAchievements);
        setUsers(usersWithAchievementCount);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAchievementsAndUsers();
  }, [isAdmin]);

  const labels = generateLineChartLabels(year);

  const series = isAdmin
    ? generateLineChartDataForAdmin(achievements, users, year)
    : generateLineChartDataForUser(achievements, year);

  const currentVisitsSeries = isAdmin
    ? generatePieChartDateForAdmin(users)
    : generatePieChartDataForUser(achievements);

  const currentSubjectChart = isAdmin
    ? generateRadarChartDataForAdmin(users, achievements)
    : generateRadarChartDataForUser(achievements);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Kasit Achievements Hub - Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={isAdmin ? 6 : 12}>
          <AppWidgetSummary
            title="Achievements"
            total={achievements.length}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_achievement.png" />}
          />
        </Grid>

        {isAdmin && (
          <Grid xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title={'Users'}
              total={users.length}
              icon={<img alt="icon" src={'/assets/icons/glass/ic_glass_users.png'} />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={12}>
          <LineChart
            title="Line Chart"
            subheader={
              isAdmin ? CONSTANTS.ADMIN_LINE_CHART_SUB_HEADER : CONSTANTS.USER_LINE_CHART_SUB_HEADER
            }
            chart={{
              labels: labels,
              series: [...series],
            }}
            year={year}
            onYearChange={setYear}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <PieChart
            title="Pie Chart"
            subheader={
              isAdmin ? CONSTANTS.ADMIN_PIE_CHART_SUB_HEADER : CONSTANTS.USER_PIE_CHART_SUB_HEADER
            }
            chart={{
              series: currentVisitsSeries,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <RadarChart
            title="Radar Chart"
            subheader={
              isAdmin
                ? CONSTANTS.ADMIN_RADAR_CHART_SUB_HEADER
                : CONSTANTS.USER_RADAR_CHART_SUB_HEADER
            }
            chart={{
              categories: currentSubjectChart.categories,
              series: currentSubjectChart.series,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
