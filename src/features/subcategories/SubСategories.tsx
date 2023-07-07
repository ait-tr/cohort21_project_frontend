import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import {
  loadSubCategories,
  updateSubCategory,
  createSubCategory,
} from './subСategoriesSlice';
import { selectError, selectSubCategories } from './selectors';
import { selectCategories } from '../categories/selectors';
import { useAppDispatch } from '../../store';

export default function SubCategories(): JSX.Element {
  const error = useSelector(selectError);
  const subCategories = useSelector(selectSubCategories);
  const categories = useSelector(selectCategories);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const isEditing = subCategoryId !== null;

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (isEditing) {
        const dispatchResult = await dispatch(
          updateSubCategory({
            id: Number(subCategoryId),
            updatedSubCategory: {
              id: Number(subCategoryId),
              title,
              description,
              categoryId,
            },
          })
        );
        if (updateSubCategory.fulfilled.match(dispatchResult)) {
          setSubCategoryId(null);
          setDescription('');
          setTitle('');
        }
      } else {
        const dispatchResult = await dispatch(
          createSubCategory({ title, description, categoryId })
        );
        if (createSubCategory.fulfilled.match(dispatchResult)) {
          setSubCategoryId(null);
          setDescription('');
          setTitle('');
        }
      }
    },
    [isEditing, dispatch, subCategoryId, title, description, categoryId]
  );

  const handleUpdate = React.useCallback(
    (subCategoryIdtoUpdate: number): void => {
      const subCategoryToUpdate = subCategories.find(
        (subCategory) => subCategory.id === subCategoryIdtoUpdate
      );
      if (subCategoryToUpdate) {
        setSubCategoryId(subCategoryToUpdate.id);
        setCategoryId(subCategoryToUpdate.categoryId);
        setTitle(subCategoryToUpdate.title);
        setDescription(subCategoryToUpdate.description);
      } else {
        setSubCategoryId(null);
        setCategoryId(0);
        setTitle('');
        setDescription('');
      }
    },
    [subCategories]
  );

  const handleChangeCategory = (event: SelectChangeEvent): void => {
    const selectedCategoryId = Number(event.target.value);
    setCategoryId(selectedCategoryId);
  };

  useEffect(() => {
    dispatch(loadSubCategories());
  }, [dispatch]);

  return (
    <Container sx={{ borderTop: 2 }}>
      <Typography sx={{ mt: 3 }} variant="h6">
        {isEditing ? 'Edit SubCategories' : 'Add SubCategories'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            sx={{ maxWidth: '3rem' }}
            type="text"
            placeholder="Id..."
            aria-label="Id..."
            title="id"
            value={subCategoryId !== null ? subCategoryId.toString() : ''}
            onChange={() => setSubCategoryId(null)}
            disabled
          />
          <Select
            sx={{ minWidth: '10rem' }}
            labelId="category-label"
            id="category-select"
            value={categoryId.toString()}
            label="Category"
            onChange={handleChangeCategory}
          >
            {categories.map((element) => (
              <MenuItem key={element.id} value={element.id}>
                {element.title}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="text"
            placeholder="SubCategories..."
            aria-label="SubCategories..."
            title="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Description..."
            aria-label="Description..."
            title="SubCategoriesDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button sx={{ ml: 1 }} type="submit" variant="contained" color="primary">
            {isEditing ? 'Update SubCategory' : 'Add SubCategory'}
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </form>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6">All SubCategories</Typography>
        <ul>
          {subCategories?.map((element) => (
            <li key={element.id}>
              {element.id} {element.title}
              <Button onClick={() => handleUpdate(element.id)}>
                <EditIcon />
              </Button>
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}
