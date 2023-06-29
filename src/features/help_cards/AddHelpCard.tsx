import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectError, selectHelpCards } from './selectors';
import { createHelpCard } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import { selectUserCards } from '../auth/selectors';
import { getUserCards } from '../auth/authSlice';

export default function HelpCards(): JSX.Element {
  const error = useSelector(selectError);
  const helpCards2 = useSelector(selectUserCards);
  const helpCards = useSelector(selectHelpCards);
  console.log('selectUserCards');
  console.log(helpCards2);
  console.log('selectHelpCards');
  console.log(helpCards);

  const [categoryId, setCategoryId] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      // const dispatchResult =
      await dispatch(
        createHelpCard({ categoryId, subCategoryId, price, description })
      );
      // if (createHelpCard.fulfilled.match(dispatchResult)) {
      setCategoryId(0);
      setSubCategoryId(0);
      setPrice(0);
      setDescription('');
      // }
    },
    [dispatch, categoryId, subCategoryId, price, description]
  );
  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch]);

  return (
    <>
      <h3>Добавить карточку</h3>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div>
          <TextField
            sx={{ mt: '1rem' }}
            id="categoryId"
            label="categoryId"
            variant="outlined"
            size="small"
            value={categoryId}
            onChange={(e) => setCategoryId(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <TextField
            sx={{ mt: '1rem' }}
            id="subCategoryId"
            label="subCategoryId"
            variant="outlined"
            size="small"
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <TextField
            sx={{ mt: '1rem' }}
            id="price"
            label="price"
            variant="outlined"
            size="small"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <TextField
            sx={{ mt: '1rem' }}
            id="description"
            label="description"
            variant="outlined"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth={false}
          sx={{ mt: '1rem', maxWidth: '8rem' }}
        >
          Add Card
        </Button>

        {error && (
          <div className="invalid-feedback text-end" style={{ display: 'block' }}>
            {error}
          </div>
        )}
      </form>
    </>
  );
}
