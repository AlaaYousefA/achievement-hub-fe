import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
  IconButton,
  Box,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Avatar,
  PaginationItem,
} from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AchievementsList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const AchievementStatus = styled(Box)(({ theme, status }) => {
  let backgroundColor;
  let color;
  switch (status) {
    case 'PENDING':
      backgroundColor = '#FFF4E5';
      color = '#FFA500';
      break;
    case 'REJECTED':
      backgroundColor = '#FFE5E5';
      color = '#FF4C4C';
      break;
    case 'APPROVED':
      backgroundColor = '#E5F5E5';
      color = '#4CAF50';
      break;
    default:
      backgroundColor = theme.palette.grey[300];
      color = theme.palette.text.secondary;
  }
  return {
    backgroundColor,
    color,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem',
    fontWeight: 400,
    display: 'inline-block',
    marginTop: theme.spacing(0.5),
    textTransform: 'capitalize',
  };
});

const AchievementName = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

const IconButtonSmall = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  fontSize: '0.875rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const ViewButtonContainer = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function UserAchievements({
  achievements,
  page,
  size,
  totalPages,
  onPageChange,
  onSizeChange,
}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const formatTime = (time) => {
    return format(new Date(time), "yyyy MMM dd 'at' h:mm a");
  };

  const handleView = (achievementId) => {
    navigate(`/achievements/${achievementId}`);
  };

  return (
    <React.Fragment>
      <Typography variant="h6">Achievements</Typography>
      <Typography color="textSecondary">{achievements.length} Achievements</Typography>
      <AchievementsList>
        {achievements.map((achievement, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() => handleExpandClick(index)}
              sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}
            >
              <ListItemAvatar>
                <Avatar src={achievement.image} alt={achievement.name} />
              </ListItemAvatar>
              <Box sx={{ flexGrow: 1 }}>
                <AchievementName>{achievement.name}</AchievementName>
                <AchievementStatus status={achievement.status}>
                  {achievement.status.toLowerCase()}
                </AchievementStatus>
              </Box>
              <IconButtonSmall edge="end" aria-label="expand">
                {expanded[index] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButtonSmall>
            </ListItem>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {achievement.title && (
                  <ListItem>
                    <ListItemText primary="Title" secondary={achievement.title} />
                  </ListItem>
                )}
                {achievement.description && (
                  <ListItem>
                    <ListItemText primary="Description" secondary={achievement.description} />
                  </ListItem>
                )}
                {achievement.category && (
                  <ListItem>
                    <ListItemText primary="Category" secondary={achievement.category} />
                  </ListItem>
                )}
                {achievement.tags && achievement.tags.length > 0 && (
                  <ListItem>
                    <ListItemText primary="Tags" secondary={achievement.tags.join(', ')} />
                  </ListItem>
                )}
                {achievement.location && (
                  <ListItem>
                    <ListItemText primary="Location" secondary={achievement.location} />
                  </ListItem>
                )}
                {achievement.time && (
                  <ListItem>
                    <ListItemText primary="Time" secondary={formatTime(achievement.time)} />
                  </ListItem>
                )}
                {achievement.comments && (
                  <ListItem>
                    <ListItemText primary="Comments" secondary={achievement.comments} />
                  </ListItem>
                )}
                <ViewButtonContainer>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleView(achievement.id)}
                  >
                    View
                  </Button>
                </ViewButtonContainer>
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </AchievementsList>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          color="primary"
          size="small"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                fontSize: '0.875rem',
                padding: '4px 8px',
              }}
            />
          )}
        />
        <FormControl variant="outlined" size="small">
          <InputLabel>Page Size</InputLabel>
          <Select value={size} onChange={onSizeChange} label="Page Size">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
