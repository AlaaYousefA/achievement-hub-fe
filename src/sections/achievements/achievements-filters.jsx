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
import DateFnsAdapter from '@date-io/date-fns';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import achievementCategories from 'src/static/categories';

export const CATEGORY_OPTIONS = achievementCategories;
export const STATUS_OPTIONS = ['Pending', 'Rejected', 'Approved'];

export default function AchievementsFilters({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  filterName,
  onFilterName,
  filterCategory,
  onFilterCategory,
  filterStatus,
  onFilterStatus,
  filterTime,
  onFilterTime,
  filterUser,
  onFilterUser,
  filterTitle,
  onFilterTitle,
}) {
  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Category</Typography>
      <FormGroup>
        {CATEGORY_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            label={item}
            control={
              <Checkbox
                checked={filterCategory.includes(item)}
                onChange={(e) => {
                  const newFilter = e.target.checked
                    ? [...filterCategory, item]
                    : filterCategory.filter((cat) => cat !== item);
                  onFilterCategory(newFilter);
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderStatus = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Status</Typography>
      <FormGroup>
        {STATUS_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            label={item}
            control={
              <Checkbox
                checked={filterStatus.includes(item)}
                onChange={(e) => {
                  const newFilter = e.target.checked
                    ? [...filterStatus, item]
                    : filterStatus.filter((status) => status.toLowerCase() !== item.toLowerCase());
                  onFilterStatus(newFilter);
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

  const renderTitle = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Title</Typography>
      <FormGroup>
        <TextField value={filterTitle} onChange={(e) => onFilterTitle(e.target.value)} />
      </FormGroup>
    </Stack>
  );

  const renderTime = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Time</Typography>
      <FormGroup>
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            value={filterTime}
            onChange={onFilterTime}
          />
        </LocalizationProvider>
      </FormGroup>
    </Stack>
  );

  const renderUser = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">User</Typography>
      <FormGroup>
        <TextField value={filterUser} onChange={(e) => onFilterUser(e.target.value)} />
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
            {renderCategory}

            {renderStatus}

            {renderName}

            {renderTitle}

            {renderTime}

            {renderUser}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

AchievementsFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterCategory: PropTypes.array,
  onFilterCategory: PropTypes.func,
  filterStatus: PropTypes.array,
  onFilterStatus: PropTypes.func,
  filterTime: PropTypes.any,
  onFilterTime: PropTypes.func,
  filterUser: PropTypes.string,
  onFilterUser: PropTypes.func,
  filterTitle: PropTypes.string,
  onFilterTitle: PropTypes.func,
};
