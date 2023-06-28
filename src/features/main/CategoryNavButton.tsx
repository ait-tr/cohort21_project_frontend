import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { selectCategories } from '../categories/selectors';
import { loadCategories } from '../categories/categoriesSlice';
import { useAppDispatch } from '../../store';

interface CategoryNavButtonProps {
  handleFilter: (value: number | null) => void;
}

function CategoryNavButton({ handleFilter }: CategoryNavButtonProps): JSX.Element {
  const categories = useSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      {categories?.map((element) => (
        <Grid item key={element.id}>
          <Button
            variant="contained"
            color="primary"
            key={element.id}
            onClick={() => handleFilter(element.id)}
          >
            {element.title}
          </Button>
          <Button variant="contained" onClick={() => handleFilter(null)}>
        Show All Cards
      </Button>
      
        </Grid>
      ))}
    </Grid>
  );
}

export default CategoryNavButton;
