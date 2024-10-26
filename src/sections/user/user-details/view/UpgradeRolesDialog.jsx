import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Button,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import UsersService from '../../services/UsersService';

const rolesOptions = [
  { label: 'User', value: 'USER' },
  { label: 'Sub Admin', value: 'SUB_ADMIN' },
];

export default function UpgradeRolesDialog({ open, onClose, user }) {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user.idmRoles && typeof user.idmRoles === 'string') {
      const rolesArray = user.idmRoles.split(',').map((role) => role.trim());
      setSelectedRoles(rolesArray);
    }
  }, [user.idmRoles]);

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setSelectedRoles(typeof value === 'string' ? value.split(',') : value);
    setError(''); // Clear error on change
  };

  const getSelectedLabels = () => {
    return selectedRoles
      .map((role) => rolesOptions.find((option) => option.value === role)?.label)
      .filter(Boolean)
      .join(', ');
  };

  const handleUpgrade = async () => {
    if (selectedRoles.length === 0) {
      setError('At least one role must be selected.');
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    try {
      const success = await UsersService.upgrade(user.username, selectedRoles);
      if (success) {
        enqueueSnackbar('User roles upgraded successfully!', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to upgrade user roles.', { variant: 'error' });
      }
      setConfirmOpen(false);
      onClose();
    } catch (error) {
      enqueueSnackbar('An error occurred while upgrading roles.', { variant: 'error' });
      setConfirmOpen(false);
    }
  };

  const handleCancelUpgrade = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upgrade User Roles</DialogTitle>
        <DialogContent>
          <FormControl
            variant="outlined"
            fullWidth
            error={Boolean(error)}
            sx={{ marginTop: '10px' }}
          >
            <InputLabel id="roles-select-label">
              {selectedRoles.length === 0 ? 'Select Roles' : ''}
            </InputLabel>
            <Select
              labelId="roles-select-label"
              multiple
              value={selectedRoles}
              onChange={handleRoleChange}
              renderValue={getSelectedLabels}
              displayEmpty
              label={selectedRoles.length === 0 ? 'Select Roles' : ''}
            >
              {rolesOptions.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  <ListItemIcon>
                    <Checkbox checked={selectedRoles.indexOf(role.value) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={role.label} />
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpgrade} color="primary" variant="contained">
            Upgrade
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleCancelUpgrade} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Upgrade</DialogTitle>
        <DialogContent>
          Are you sure you want to upgrade the user roles to: {getSelectedLabels()}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelUpgrade} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUpgrade} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
