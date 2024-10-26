import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import { FaTimes, FaTrash, FaRedo } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AchievementsService from '../services/AchievementsService';
import TagInput from 'src/components/TagInput';
import achievementCategories from 'src/static/categories';

const categoryOptions = achievementCategories;

export default function AchievementDialog({
  open,
  onClose,
  fetchAchievements,
  achievement = null,
}) {
  const [references, setReferences] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState('');

  const isEditMode = !!achievement;

  useEffect(() => {
    if (achievement) {
      setReferences(
        achievement.reference
          ? Object.entries(achievement.reference).map(([key, value]) => ({
              key,
              type: typeof value === 'string' && value.startsWith('data:') ? 'file' : 'text',
              value,
              fileName: '', // Add fileName to handle displaying the name of uploaded files
            }))
          : []
      );
      setTags(achievement.tags || []);
      setImage(achievement.image || ''); // Set the existing image if editing
    }
  }, [achievement]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const formik = useFormik({
    initialValues: {
      name: achievement?.name || '',
      description: achievement?.description || '',
      location: achievement?.location || '',
      title: achievement?.title || '',
      time: achievement?.time || '',
      category: achievement?.category || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      location: Yup.string().required('Location is required'),
      title: Yup.string().required('Title is required'),
      time: Yup.date().required('Time is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values) => {
      try {
        const formattedReferences = references.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});

        const payload = {
          ...values,
          tags,
          reference: formattedReferences,
          image, // Include the image in the payload
        };

        let success;
        if (isEditMode) {
          success = await AchievementsService.update(achievement.id, payload);
        } else {
          success = await AchievementsService.add(payload);
        }

        if (success) {
          alert(`Achievement ${isEditMode ? 'updated' : 'added'} successfully!`);
          onClose();
          fetchAchievements();
        } else {
          alert(`You are not authorized to ${isEditMode ? 'update' : 'add'} this achievement.`);
        }
      } catch (error) {
        console.error(`Error ${isEditMode ? 'updating' : 'adding'} achievement:`, error);
      }
    },
  });

  const handleAddReference = () => {
    setReferences([...references, { key: '', type: 'text', value: '', fileName: '' }]);
  };

  const handleRemoveReference = (index) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  const handleReferenceChange = async (index, field, value) => {
    const updatedReferences = [...references];
    if (
      field === 'value' &&
      (updatedReferences[index].type === 'image' || updatedReferences[index].type === 'file')
    ) {
      const file = value;
      const base64 = await fileToBase64(file);
      updatedReferences[index][field] = base64;
      updatedReferences[index].fileName = file.name; // Store the file name
    } else {
      updatedReferences[index][field] = value;
    }
    setReferences(updatedReferences);
  };

  const handleReupload = (index) => {
    const updatedReferences = [...references];
    updatedReferences[index].value = ''; // Clear the value
    updatedReferences[index].fileName = ''; // Clear the fileName
    setReferences(updatedReferences);
  };

  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImage(base64);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Avatar
            src={image}
            alt="Achievement Image"
            sx={{ width: 60, height: 60, marginRight: 2 }}
          />
          {isEditMode ? 'Update Achievement' : 'Request New Achievement'}
        </Box>
        <IconContext.Provider value={{ size: '1.5em' }}>
          <Button
            aria-label="close"
            onClick={onClose}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey',
            }}
          >
            <FaTimes />
          </Button>
        </IconContext.Provider>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{
              textTransform: 'none',
              bgcolor: '#1976D2',
              color: '#fff',
              '&:hover': {
                bgcolor: '#1565C0',
              },
              mb: 2,
            }}
          >
            {image ? 'Change Image' : 'Upload Image'}
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            fullWidth
            margin="normal"
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <TextField
            fullWidth
            margin="normal"
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            id="time"
            name="time"
            label="Time"
            type="datetime-local"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            <InputLabel>Category</InputLabel>
            <Select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              label="Category"
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.category && (
              <Typography variant="body2" color="error">
                {formik.errors.category}
              </Typography>
            )}
          </FormControl>

          <TagInput tags={tags} setTags={setTags} />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Evidences
          </Typography>
          {references.length === 0 && (
            <Typography color="textSecondary">No evidences added.</Typography>
          )}
          {references.map((reference, index) => (
            <Box key={index} mb={3}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Key"
                    value={reference.key}
                    onChange={(event) => handleReferenceChange(index, 'key', event.target.value)}
                    error={
                      formik.touched.references?.[index]?.key &&
                      Boolean(formik.errors.references?.[index]?.key)
                    }
                    helperText={
                      formik.touched.references?.[index]?.key &&
                      formik.errors.references?.[index]?.key
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.references?.[index]?.type &&
                      Boolean(formik.errors.references?.[index]?.type)
                    }
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      value={reference.type}
                      onChange={(event) => handleReferenceChange(index, 'type', event.target.value)}
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="image">Image</MenuItem>
                      <MenuItem value="file">File</MenuItem>
                    </Select>
                    {formik.touched.references?.[index]?.type && (
                      <Typography variant="body2" color="error">
                        {formik.errors.references?.[index]?.type}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  {reference.type === 'text' ? (
                    <TextField
                      fullWidth
                      label="Value"
                      value={reference.value}
                      onChange={(event) =>
                        handleReferenceChange(index, 'value', event.target.value)
                      }
                      error={
                        formik.touched.references?.[index]?.value &&
                        Boolean(formik.errors.references?.[index]?.value)
                      }
                      helperText={
                        formik.touched.references?.[index]?.value &&
                        formik.errors.references?.[index]?.value
                      }
                    />
                  ) : reference.fileName ? (
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" noWrap sx={{ mr: 2 }}>
                        {reference.fileName}
                      </Typography>
                      <IconButton onClick={() => handleReupload(index)} color="primary">
                        <FaRedo />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        bgcolor: '#1976D2',
                        color: '#fff',
                        '&:hover': {
                          bgcolor: '#1565C0',
                        },
                      }}
                    >
                      {reference.type === 'image' ? 'Upload Image' : 'Upload File'}
                      <input
                        type="file"
                        hidden
                        accept={reference.type === 'image' ? 'image/*' : '*/*'}
                        onChange={(event) =>
                          handleReferenceChange(index, 'value', event.currentTarget.files[0])
                        }
                      />
                    </Button>
                  )}
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <IconButton onClick={() => handleRemoveReference(index)} color="secondary">
                    <IconContext.Provider value={{ color: 'red', size: '1em' }}>
                      <FaTrash />
                    </IconContext.Provider>
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddReference} sx={{ mt: 2 }}>
            Add Evidence
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: 'gray' }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" onClick={formik.handleSubmit}>
          {isEditMode ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
