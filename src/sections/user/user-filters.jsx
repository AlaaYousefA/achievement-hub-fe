import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { formatKasitRole } from 'src/utils/format-user-role';
import departments from 'src/static/departments';
import kasitRoles from 'src/static/kasitRoles';

export const DEPARTMENT_OPTIONS = departments;
export const ROLE_OPTIONS = kasitRoles;

export default function UserFilters({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  filterName,
  onFilterName,
  filterDepartment,
  onFilterDepartment,
  filterRole,
  onFilterRole,
  filterAchievementNo,
  onFilterAchievementNo,
}) {
  const renderDepartment = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Department</Typography>
      <FormGroup>
        {DEPARTMENT_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            label={item}
            control={
              <Checkbox
                checked={filterDepartment.includes(item)}
                onChange={(e) => {
                  const newFilter = e.target.checked
                    ? [...filterDepartment, item]
                    : filterDepartment.filter((dept) => dept !== item);
                  onFilterDepartment(newFilter);
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderRole = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Role</Typography>
      <FormGroup>
        {ROLE_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            label={formatKasitRole(item)}
            control={
              <Checkbox
                checked={filterRole.includes(item)}
                onChange={(e) => {
                  const newFilter = e.target.checked
                    ? [...filterRole, item]
                    : filterRole.filter((role) => role !== item);
                  onFilterRole(newFilter);
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderName = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Name</Typography>
      <FormGroup>
        <TextField value={filterName} onChange={(e) => onFilterName(e.target.value)} />
      </FormGroup>
    </Stack>
  );

  const renderAchievementNo = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Achievement No</Typography>
      <FormGroup>
        <TextField
          value={filterAchievementNo}
          onChange={(e) => onFilterAchievementNo(e.target.value)}
        />
      </FormGroup>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderDepartment}

            {renderRole}

            {renderName}

            {renderAchievementNo}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

UserFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterDepartment: PropTypes.array,
  onFilterDepartment: PropTypes.func,
  filterRole: PropTypes.array,
  onFilterRole: PropTypes.func,
  filterAchievementNo: PropTypes.string,
  onFilterAchievementNo: PropTypes.func,
};
