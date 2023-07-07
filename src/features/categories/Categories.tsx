import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { selectError, selectCategories } from './selectors';
import { createCategory, loadCategories, updateCategory } from './categoriesSlice';
import { useAppDispatch } from '../../store';

export default function Categories(): JSX.Element {
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const isEditing = categoryId !== null;

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (isEditing) {
        const dispatchResult = await dispatch(
          updateCategory({
            id: Number(categoryId),
            updatedCategory: {
              id: Number(categoryId),
              title,
              description,
            },
          })
        );
        if (updateCategory.fulfilled.match(dispatchResult)) {
          setCategoryId(null);
          setDescription('');
          setTitle('');
        }
      } else {
        const dispatchResult = await dispatch(
          createCategory({ title, description })
        );
        if (createCategory.fulfilled.match(dispatchResult)) {
          setCategoryId(null);
          setDescription('');
          setTitle('');
        }
      }
    },
    [isEditing, dispatch, categoryId, title, description]
  );

  const handleUpdate = React.useCallback(
    (categoryIdtoUpdate: number): void => {
      const categoryToUpdate = categories.find(
        (category) => category.id === categoryIdtoUpdate
      );
      if (categoryToUpdate) {
        setCategoryId(categoryToUpdate.id);
        setTitle(categoryToUpdate.title);
        setDescription(categoryToUpdate.description);
      } else {
        setCategoryId(null);
        setTitle('');
        setDescription('');
      }
    },
    [categories]
  );

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h6">
        {isEditing ? 'Edit Categories' : 'Add Categories'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            sx={{ maxWidth: '3rem' }}
            type="text"
            placeholder="Id..."
            aria-label="Id..."
            title="id"
            value={categoryId !== null ? categoryId.toString() : ''}
            onChange={() => setCategoryId(null)}
            disabled
          />
          <TextField
            type="text"
            placeholder="Categories..."
            aria-label="Categories..."
            title="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Description..."
            aria-label="Description..."
            title="CategoryDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button sx={{ ml: 1 }} type="submit" variant="contained" color="primary">
            {isEditing ? 'Update category' : 'Add category'}
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </form>
      <Typography variant="h6">All Categories</Typography>
      <ul>
        {categories?.map((element) => (
          <li key={element.id}>
            {element.id} {element.title}
            <Button onClick={() => handleUpdate(element.id)}>
              <EditIcon />
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
