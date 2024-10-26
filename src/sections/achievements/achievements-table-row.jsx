import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import { format } from 'date-fns';

// ----------------------------------------------------------------------

const AchievementStatus = styled(Box)(({ theme, status }) => {
  let backgroundColor;
  let color;
  switch (status) {
    case 'PENDING':
      backgroundColor = '#FFF4E5'; // Light Orange
      color = '#FFA500'; // Orange
      break;
    case 'REJECTED':
      backgroundColor = '#FFE5E5'; // Light Red
      color = '#FF4C4C'; // Red
      break;
    case 'APPROVED':
      backgroundColor = '#E5F5E5'; // Light Green
      color = '#4CAF50'; // Green
      break;
    default:
      backgroundColor = theme.palette.grey[300];
      color = theme.palette.text.secondary;
  }
  return {
    backgroundColor,
    color,
    padding: theme.spacing(0.5, 1), // Increased padding
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.7rem', // Slightly larger font size for better readability
    fontWeight: 400, // Medium font weight
    display: 'inline-block',
    marginTop: theme.spacing(0.5),
    textTransform: 'capitalize', // Capitalize the first letter of each word
  };
});

export default function AchievementTableRow({
  img,
  name,
  title,
  category,
  time,
  user,
  status,
  handleClick,
}) {
  const formatTime = (time) => {
    return format(new Date(time), "yyyy MMM dd 'at' h:mm a");
  };

  const cellStyle = { fontSize: '0.8rem' };

  return (
    <TableRow hover tabIndex={-1} onClick={handleClick}>
      <TableCell component="th" scope="row" padding="15">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={img} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="center" style={cellStyle}>
        {title}
      </TableCell>
      <TableCell align="center" style={cellStyle}>
        {category}
      </TableCell>
      <TableCell align="center" style={cellStyle}>
        {formatTime(time)}
      </TableCell>
      <TableCell align="center" style={cellStyle}>
        {user}
      </TableCell>
      <TableCell align="center">
        <AchievementStatus status={status}>{status.toLowerCase()}</AchievementStatus>
      </TableCell>
    </TableRow>
  );
}

AchievementTableRow.propTypes = {
  img: PropTypes.any,
  status: PropTypes.any,
  title: PropTypes.any,
  category: PropTypes.any,
  time: PropTypes.any,
  user: PropTypes.any,
  name: PropTypes.any,
  handleClick: PropTypes.func,
};
