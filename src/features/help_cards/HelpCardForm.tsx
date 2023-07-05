import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectError, selectHelpCards } from './selectors';
import { createHelpCard, getHelpCards } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import { selectCategories } from '../categories/selectors';
import { selectSubCategories } from '../subcategories/selectors';
import { loadCategories } from '../categories/categoriesSlice';
import { loadSubCategories } from '../subcategories/subСategoriesSlice';
import HelpCard from './types/HelpCard';
import { getHelpCard, updateHelpCard } from './api';

interface AddHelpCardFormProps {
  isEditMode: Boolean;
}
export default function AddHelpCardForm({ isEditMode }: AddHelpCardFormProps): JSX.Element {
  const error = useSelector(selectError);
  const [title, setTitle] = useState<string>('');
  const categories = useSelector(selectCategories);
  const subCategories = useSelector(selectSubCategories);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const helpCards = useSelector(selectHelpCards);
  const { id } = useParams<{ id: string }>();
  console.log('helpCards:', helpCards);
  console.log('id:', id);
  const selectedCard = helpCards.find((card: HelpCard) => card.id === Number(id));
  const [statusMessage, setStatusMessage] = useState<string>(''); // Add new state variable
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!isEditMode) {
        const dispatchResult = await dispatch(
          createHelpCard({
            title,
            categoryId,
            subCategoryId,
            price,
            description,
            fullDescription,
          })
        );
        if (dispatchResult.meta.requestStatus === 'fulfilled') {
          setStatusMessage('Card added successfully.');
          const helpCard = dispatchResult.payload as HelpCard;
          console.log(helpCard.id);
         setTimeout(() => {
            setShowSnackbar(false);
            navigate(`/card-details/${helpCard.id}`);
          }, 500);
          setShowSnackbar(true);
        }
      } else if (selectedCard) {
          const updatedCard = {
            ...selectedCard,
            title,
            categoryId,
            subCategoryId,
            price,
            description,
            fullDescription,
          };
          await updateHelpCard(updatedCard);
          setStatusMessage('Changes saved successfully.');
          setTimeout(() => {
            setShowSnackbar(false);
            // Redirect to the start page
            navigate('/api/users/my/profile');
          }, 1000);
          setShowSnackbar(true);
      }
      setTitle('');
      setCategoryId(0);
      setSubCategoryId(0);
      setPrice(0);
      setDescription('');
      setFullDescription('');
      dispatch(getUserCards());
    },
    [
      dispatch,
      title,
      categoryId,
      subCategoryId,
      price,
      description,
      fullDescription,
      navigate,
      isEditMode,
      selectedCard,
    ]
  );
  const handleCategoryChange = (event: SelectChangeEvent<number>): void => {
    const selectedCategoryId = Number(event.target.value);
    setCategoryId(selectedCategoryId);
  };
  const handleSubCategoryChange = (event: SelectChangeEvent<number>): void => {
    setSubCategoryId(Number(event.target.value));
  };
  const handleCancel = ():void => {
    setTitle('');
    setCategoryId(0);
    setSubCategoryId(0);
    setPrice(0);
    setDescription('');
    setFullDescription('');
    navigate('/api/users/my/profile');
  };

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadSubCategories());
    dispatch(getHelpCards());

    if (isEditMode && id !== undefined) {
      // Fetch help card data and populate form fields
      const cardId = Number(id);
      getHelpCard(cardId)
        .then((helpCard) => {
          setTitle(helpCard.title);
          setCategoryId(helpCard.category.id);
          setSubCategoryId(helpCard.subCategory.id);
          setPrice(helpCard.price);
          setDescription(helpCard.description);
          setFullDescription(helpCard.fullDescription);
        });
    }
  }, [dispatch, id, isEditMode]);

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

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={categoryId}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories?.map((element) => (
              <MenuItem key={element.id} value={element.id}>
                {element.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="subcategory-label">SubCategory</InputLabel>
          <Select
            labelId="subcategory-label"
            id="subcategory-select"
            value={subCategoryId}
            label="Subcategory"
            onChange={handleSubCategoryChange}
          >
            {subCategories?.map((element) =>
              element.categoryId === categoryId ? (
                <MenuItem key={element.id} value={element.id}>
                  {element.title}
                </MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>

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
          multiline
          rows={4}
          margin="normal"
          id="description"
          label="Description"
          variant="outlined"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
          id="full_description"
          label="Full Description"
          variant="outlined"
          size="small"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? 'Save Change' : 'Add Card'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert severity="success" onClose={() => setShowSnackbar(false)}>
            {statusMessage}
          </Alert>
        </Snackbar>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}
