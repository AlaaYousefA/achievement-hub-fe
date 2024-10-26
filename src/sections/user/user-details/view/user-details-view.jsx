import React from 'react';
import { Container, Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import AuthenticationService from '../../../../security/AuthenticationService';
import UserDetailsInfo from './UserDetailsInfo';
import UserAchievements from './UserAchievements';
import UpgradeRolesDialog from './UpgradeRolesDialog';

const Root = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  maxWidth: 700,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    maxWidth: '100%',
  },
}));

const UpgradeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976D2',
  '&:hover': {
    backgroundColor: '#1565C0',
  },
}));

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 60,
});

export default function UserDetailsView({
  user,
  achievements,
  page,
  size,
  totalPages,
  onPageChange,
  onSizeChange,
}) {
  const isAdmin = AuthenticationService.isAdmin();
  const [openUpgradeDialog, setOpenUpgradeDialog] = React.useState(false);

  const handleOpenUpgradeDialog = () => {
    setOpenUpgradeDialog(true);
  };

  const handleCloseUpgradeDialog = () => {
    setOpenUpgradeDialog(false);
  };

  return (
    <Container maxWidth="md">
      <Root>
        <UserDetailsInfo user={user} />
        <UserAchievements
          achievements={achievements}
          page={page}
          size={size}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onSizeChange={onSizeChange}
        />

        {isAdmin && (
          <ButtonContainer>
            <UpgradeButton variant="contained" onClick={handleOpenUpgradeDialog}>
              Upgrade Roles
            </UpgradeButton>
          </ButtonContainer>
        )}
      </Root>
      <UpgradeRolesDialog open={openUpgradeDialog} onClose={handleCloseUpgradeDialog} user={user} />
    </Container>
  );
}
