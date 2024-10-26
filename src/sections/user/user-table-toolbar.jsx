import { useState } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';

import UserFilters from './user-filters';

export default function UserTableToolbar({
  numSelected,
  filterName,
  filterDepartment,
  filterRole,
  filterAchievementNo,
  onFilterName,
  onFilterDepartment,
  onFilterRole,
  onFilterAchievementNo,
}) {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'flex-end',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <UserFilters
        openFilter={openFilter}
        onOpenFilter={handleOpenFilter}
        onCloseFilter={handleCloseFilter}
        filterName={filterName}
        filterDepartment={filterDepartment}
        filterRole={filterRole}
        filterAchievementNo={filterAchievementNo}
        onFilterName={onFilterName}
        onFilterDepartment={onFilterDepartment}
        onFilterRole={onFilterRole}
        onFilterAchievementNo={onFilterAchievementNo}
      />
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterDepartment: PropTypes.array,
  filterRole: PropTypes.array,
  filterAchievementNo: PropTypes.string,
  onFilterDepartment: PropTypes.func,
  onFilterRole: PropTypes.func,
  onFilterAchievementNo: PropTypes.func,
};
