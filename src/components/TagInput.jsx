import React, { useState } from 'react';
import { TextField, Chip, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleDelete = (tagToDelete) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor="tags" shrink>
        Tags
      </InputLabel>
      <OutlinedInput
        id="tags"
        fullWidth
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag"
        startAdornment={
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.75,
              paddingY: 1.5,
              paddingX: 0.75,
              '& > *': {
                margin: '4px 3px',
              },
            }}
          >
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={handleDelete(tag)}
                deleteIcon={<FaTimes style={{ fontSize: '12px' }} />}
                sx={{
                  backgroundColor: '#e3f2fd', // Light blue background
                  color: '#0d47a1', // Darker blue text color
                  borderRadius: '6px', // Slightly rounded corners
                  height: '32px', // Consistent height
                  border: '1px solid #bbdefb', // Subtle border to define the tag
                  '& .MuiChip-label': {
                    padding: '0 12px',
                    fontSize: '14px',
                  },
                  '&:hover': {
                    backgroundColor: '#bbdefb', // Slightly darker on hover
                  },
                }}
              />
            ))}
          </Box>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '56px',
          paddingRight: '8px',
          '& .MuiOutlinedInput-input': {
            padding: '10px 8px',
            minWidth: '120px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3f51b5',
          },
        }}
        label="Tags"
      />
    </FormControl>
  );
}
