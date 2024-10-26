import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function UserTableRow({
  name,
  avatarUrl,
  department,
  role,
  achievementNo,
  handleClick,
}) {
  return (
    <TableRow hover tabIndex={-1} onClick={handleClick}>
      <TableCell component="th" scope="row" padding="15">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">{department}</TableCell>

      <TableCell align="center">{role}</TableCell>

      <TableCell align="center">{achievementNo}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  department: PropTypes.any,
  handleClick: PropTypes.func,
  achievementNo: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
};
