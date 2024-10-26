import { lazy, Suspense, React } from 'react';
import { Outlet, Navigate, useRoutes, redirect } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const AchievementsPage = lazy(() => import('src/pages/achievements'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserDetailsPage = lazy(() => import('src/pages/user-details'));
export const AchievementDetailsPage = lazy(() => import('src/pages/achievement-details'));

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ModernFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    flexDirection="column"
  >
    <CircularProgress />
    <Typography variant="h6" style={{ marginTop: '20px' }}>
      Loading, please wait...
    </Typography>
  </Box>
);

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<ModernFallback />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <IndexPage />,
          index: true,
        },
        {
          path: 'user',
          element: <UserPage />,
        },
        {
          path: 'achievements',
          element: <AchievementsPage />,
        },
        {
          path: 'user/:userId',
          element: <UserDetailsPage />,
        },
        {
          path: 'achievements/:achievementId',
          element: <AchievementDetailsPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
