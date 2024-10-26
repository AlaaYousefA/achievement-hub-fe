import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from './achievements-utils';

// ----------------------------------------------------------------------

export default function AchievementTableHead({ orderBy, headLabel, onRequestSort }) {
  const [arrowSort, setArrowSort] = useState('asc');
  const onSort = (property) => (event) => {
    onRequestSort(event, property);
    setArrowSort((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={arrowSort}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={arrowSort}
              onClick={onSort(headCell.id)}
            >
              {headCell.label}

              <Box sx={{ ...visuallyHidden }}>
                {arrowSort === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

AchievementTableHead.propTypes = {
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  onRequestSort: PropTypes.func,
};
