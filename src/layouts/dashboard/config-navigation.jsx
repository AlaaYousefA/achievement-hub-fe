import SvgColor from 'src/components/svg-color';
import AuthenticationService from 'src/security/AuthenticationService';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const generateNavConfig = () => {
  const navConfig = [
    {
      title: 'dashboard',
      path: '/',
      icon: icon('ic_analytics'),
    },
    {
      title: 'achievements',
      path: '/achievements',
      icon: icon('ic_achievement'),
    },
  ];

  const isAdmin = AuthenticationService.isAdminOrSubAdmin();
  if (isAdmin) {
    navConfig.push({
      title: 'manage users',
      path: '/user',
      icon: icon('ic_user'),
    });
  }

  return navConfig;
};

export default generateNavConfig;
