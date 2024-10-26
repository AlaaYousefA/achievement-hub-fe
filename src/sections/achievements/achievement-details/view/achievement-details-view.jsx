import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import {
  Container,
  Box,
  Avatar,
  Grid,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { FaChevronDown, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import AchievementsService from '../../services/AchievementsService';
import AchievementDialog from '../../view/AchievementDialog';
import AuthenticationService from 'src/security/AuthenticationService';

const Root = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  width: '100%',
  maxWidth: '700px',
}));

const AvatarBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const AchievementDetailsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DetailItemGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
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

const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  alignItems: 'center',
  width: '100%',
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme, buttoncolor }) => ({
  backgroundColor: buttoncolor,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: buttoncolor,
  },
}));

const ReferenceItem = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

const ReferenceHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ReferenceContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const UserIdLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
  textDecoration: 'underline',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

export default function AchievementDetailsView({ achievement }) {
  const isAdmin = AuthenticationService.isAdminOrSubAdmin();

  const navigate = useNavigate();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      const fetchedUser = await AuthenticationService.loadAuthenticatedUser();
      setUser(fetchedUser);
    };

    fetchAuthenticatedUser();
  }, []);

  const formatTime = (time) => {
    return format(new Date(time), "yyyy MMM dd 'at' h:mm a");
  };

  const handleAccept = async () => {
    try {
      await AchievementsService.approve(achievement.id);
      window.location.reload();
    } catch (error) {
      console.error('Error approving achievement:', error);
      alert('Error approving achievement. Please try again.');
    }
  };

  const handleReject = async () => {
    try {
      await AchievementsService.reject(achievement.id, rejectMessage);
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting achievement:', error);
      alert('Error rejecting achievement. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await AchievementsService.delete(achievement.id);
      navigate('/achievements');
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Error deleting achievement. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Root>
        <AvatarBox>
          <Avatar
            src={achievement.image}
            alt={achievement.name}
            sx={{ width: 120, height: 120, margin: '0 auto' }}
          />
          <Typography variant="h5" component="h1" sx={{ marginTop: 2 }}>
            {achievement.name}
          </Typography>
          <AchievementStatus status={achievement.status}>
            {achievement.status.toLowerCase()}
          </AchievementStatus>
        </AvatarBox>
        <AchievementDetailsGrid container spacing={2}>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Title</Typography>
            <Typography color="textSecondary">{achievement.title}</Typography>
          </DetailItemGrid>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Description</Typography>
            <Typography color="textSecondary">{achievement.description}</Typography>
          </DetailItemGrid>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Category</Typography>
            <Typography color="textSecondary">{achievement.category}</Typography>
          </DetailItemGrid>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Tags</Typography>
            <Typography color="textSecondary">{achievement.tags.join(', ')}</Typography>
          </DetailItemGrid>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Location</Typography>
            <Typography color="textSecondary">{achievement.location}</Typography>
          </DetailItemGrid>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">Time</Typography>
            <Typography color="textSecondary">{formatTime(achievement.time)}</Typography>
          </DetailItemGrid>
          <DetailItemGrid item xs={12}>
            <Typography variant="h6">User Id</Typography>
            <UserIdLink onClick={() => navigate(`/user/${achievement.userId}`)}>
              {achievement.userId}
            </UserIdLink>
          </DetailItemGrid>
          {achievement.comment && (
            <DetailItemGrid item xs={12}>
              <Typography variant="h6">Comment</Typography>
              <Typography color="textSecondary">{achievement.comment}</Typography>
            </DetailItemGrid>
          )}
          <DetailItemGrid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<FaChevronDown />}>
                <Typography variant="h6">Evidences</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {achievement.reference && Object.keys(achievement.reference).length > 0 ? (
                  Object.keys(achievement.reference).map((key) => (
                    <ReferenceItem key={key}>
                      <ReferenceHeader title={key.charAt(0).toUpperCase() + key.slice(1)} />
                      <ReferenceContent>
                        {typeof achievement.reference[key] === 'string' &&
                        achievement.reference[key].startsWith('http') ? (
                          <img
                            src={achievement.reference[key]}
                            alt={key}
                            style={{ maxWidth: '100%', borderRadius: '8px' }}
                          />
                        ) : achievement.reference[key].startsWith('data:') ? (
                          <Button
                            variant="contained"
                            href={achievement.reference[key]}
                            download={`${key}.${
                              achievement.reference[key].split('/')[1].split(';')[0]
                            }`}
                            sx={{ textTransform: 'none', bgcolor: '#1976D2', color: '#fff' }}
                          >
                            Download {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Button>
                        ) : (
                          <Typography variant="body2" color="textPrimary">
                            {achievement.reference[key]}
                          </Typography>
                        )}
                      </ReferenceContent>
                    </ReferenceItem>
                  ))
                ) : (
                  <Typography color="textSecondary">No Evidences</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </DetailItemGrid>
          <ActionsContainer>
            {user && achievement.userId === user.id ? (
              <Box>
                <ButtonGroup>
                  <StyledButton
                    variant="contained"
                    buttoncolor="#1976D2"
                    size="medium"
                    startIcon={<FaEdit />}
                    onClick={() => setOpenUpdateDialog(true)}
                  >
                    Update
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    buttoncolor="#F44336"
                    size="medium"
                    startIcon={<FaTrash />}
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    Delete
                  </StyledButton>
                </ButtonGroup>
              </Box>
            ) : (
              <Box></Box>
            )}
            {isAdmin && achievement.status === 'PENDING' && (
              <Box>
                <ButtonGroup>
                  <StyledButton
                    variant="contained"
                    buttoncolor="#4CAF50"
                    size="medium"
                    onClick={() => setOpenAcceptDialog(true)}
                    startIcon={<FaCheck />}
                  >
                    Accept
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    buttoncolor="#F44336"
                    size="medium"
                    onClick={() => setOpenRejectDialog(true)}
                  >
                    Reject
                  </StyledButton>
                </ButtonGroup>
              </Box>
            )}
          </ActionsContainer>
        </AchievementDetailsGrid>
      </Root>
      {openUpdateDialog && (
        <AchievementDialog
          open={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(false)}
          achievement={achievement}
        />
      )}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Achievement</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this achievement? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete();
              setOpenDeleteDialog(false);
            }}
            sx={{ color: '#fff', bgcolor: '#F44336', '&:hover': { bgcolor: '#D32F2F' } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Reject Achievement</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Rejection Message"
            value={rejectMessage}
            onChange={(e) => setRejectMessage(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleReject();
              setOpenRejectDialog(false);
            }}
            sx={{ color: '#fff', bgcolor: '#F44336', '&:hover': { bgcolor: '#D32F2F' } }}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAcceptDialog}
        onClose={() => setOpenAcceptDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Accept Achievement</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to accept this achievement?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAcceptDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAccept();
              setOpenAcceptDialog(false);
            }}
            sx={{ color: '#fff', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
