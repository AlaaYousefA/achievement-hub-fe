import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Avatar, Grid, Typography, Button } from '@mui/material';
import { formatKasitRole } from 'src/utils/format-user-role';

const AvatarBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const UserDetailsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DetailItemGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function UserDetailsInfo({ user }) {
  const [showId, setShowId] = useState(false);

  const handleToggleId = () => {
    setShowId((prev) => !prev);
  };

  return (
    <React.Fragment>
      <AvatarBox>
        <Avatar
          src={user.avatar}
          alt="User Avatar"
          sx={{ width: 120, height: 120, margin: '0 auto' }}
        />
        {user.name && (
          <Typography variant="h5" component="h1" sx={{ marginTop: 2 }}>
            {user.name}
          </Typography>
        )}
        {user.email && (
          <Typography variant="subtitle1" color="textSecondary">
            {user.email}
          </Typography>
        )}
      </AvatarBox>
      <UserDetailsGrid container spacing={2}>
        {user.id && (
          <DetailItemGrid item xs={12}>
            <StyledButton variant="contained" color="primary" onClick={handleToggleId}>
              {showId ? 'Hide ID' : 'Show ID'}
            </StyledButton>
            {showId && (
              <Typography variant="body2" style={{ wordBreak: 'break-all', marginTop: '8px' }}>
                {user.id}
              </Typography>
            )}
          </DetailItemGrid>
        )}
        {user.kasitRole && (
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Role</Typography>
            <Typography color="textSecondary">{formatKasitRole(user.kasitRole)}</Typography>
          </DetailItemGrid>
        )}
        {user.department && (
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Department</Typography>
            <Typography color="textSecondary">{user.department}</Typography>
          </DetailItemGrid>
        )}
        {user.bio && (
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Bio</Typography>
            <Typography color="textSecondary">{user.bio}</Typography>
          </DetailItemGrid>
        )}
        {user.location && (
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Location</Typography>
            <Typography color="textSecondary">{user.location}</Typography>
          </DetailItemGrid>
        )}
        {user.joined && (
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Joined</Typography>
            <Typography color="textSecondary">
              {new Date(user.joined).toLocaleDateString()}
            </Typography>
          </DetailItemGrid>
        )}
      </UserDetailsGrid>
    </React.Fragment>
  );
}
