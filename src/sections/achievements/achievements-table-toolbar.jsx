import { useState } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';

import AchievementsFilters from './achievements-filters';

export default function AchievementTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  filterCategory,
  filterStatus,
  filterTime,
  filterUser,
  filterTitle,
  onFilterCategory,
  onFilterStatus,
  onFilterTime,
  onFilterUser,
  onFilterTitle,
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
      <AchievementsFilters
        openFilter={openFilter}
        onOpenFilter={handleOpenFilter}
        onCloseFilter={handleCloseFilter}
        filterName={filterName}
        onFilterName={onFilterName}
        filterCategory={filterCategory}
        onFilterCategory={onFilterCategory}
        filterStatus={filterStatus}
        onFilterStatus={onFilterStatus}
        filterTime={filterTime}
        onFilterTime={onFilterTime}
        filterUser={filterUser}
        onFilterUser={onFilterUser}
        filterTitle={filterTitle}
        onFilterTitle={onFilterTitle}
      />
    </Toolbar>
  );
}

AchievementTableToolbar.propTypes = {
  numSelected: PropTypes.number,
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
