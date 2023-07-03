import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectError } from './selectors';
import { createHelpCard } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import { selectCategories } from '../categories/selectors';
import { selectSubCategories } from '../subcategories/selectors';
import { loadCategories } from '../categories/categoriesSlice';
import { SelectChangeEvent } from '@mui/material';


import AddHelpCardPreview from './AddHelpCardPreview';

export default function AddHelpCardForm(): JSX.Element {
  const error = useSelector(selectError);

  const [title, setTitle] = useState<string>('');
  const categories = useSelector(selectCategories);
  const subCategories = useSelector(selectSubCategories);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const [newCardId, setNewCardId] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const actionResult = await dispatch(
        createHelpCard({
          title,
          categoryId,
          subCategoryId,
          price,
          description,
          fullDescription,
        })
      );

      setTitle('');
      setCategoryId(0);
      setSubCategoryId(0);
      setPrice(0);
      setDescription('');
      setFullDescription('');
      dispatch(getUserCards());
      const newCard = actionResult.payload as { id: string };
      setNewCardId(newCard.id);
    },
    [dispatch, categoryId, subCategoryId, price, description]
  );
  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    setCategoryId(Number(event.target.value));
  };

  const handleSubCategoryChange = (event: SelectChangeEvent<number>) => {
    setSubCategoryId(Number(event.target.value));
  };

  useEffect(() => {
    dispatch(getUserCards());

  }, [dispatch]);
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);


  return (
    <Box maxWidth={400} mx="auto" p={2}>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          id="title"
          label="Title"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="Category"
          onChange={handleCategoryChange}
        >
          {categories?.map((element) => (
            <MenuItem key={element.id}  value={element.id}>
              {element.title}
            </MenuItem>))}
        </Select>
        </FormControl>


        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategoryId}
          label="Subcategory"
          onChange={handleSubCategoryChange}
        >
          {subCategories?.map((element) => (
            <MenuItem key={element.id}  value={element.id}>
              {element.title}
            </MenuItem>))}
        </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          id="subCategoryId"
          label="Subcategory ID"
          variant="outlined"
          size="small"
          type="number"
          value={subCategoryId}
          onChange={(e) => setSubCategoryId(parseFloat(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          id="price"
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="description"
          label="Description"
          variant="outlined"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          id="full_description"
          label="Full Description"
          variant="outlined"
          size="small"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Card
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </form>
      {newCardId && <AddHelpCardPreview id={newCardId.toString()} />}
    </Box>
  );
}
