import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { selectCategories } from '../categories/selectors';
import { loadCategories } from '../categories/categoriesSlice';
import { useAppDispatch } from '../../store';

interface CategoryNavButtonProps {
  handleFilter: (value: number | null) => void;
}

function SubCategoryNavButton({
  handleFilter,
}: CategoryNavButtonProps): JSX.Element {
  const categories = useSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      <Button variant="contained" onClick={() => handleFilter(null)}>
        Show All Cards
      </Button>
      {categories?.map((element) => (
        <Button
          variant="contained"
          color="primary"
          key={element.id}
          onClick={() => handleFilter(element.id)}
        >
          {element.title}
        </Button>
      ))}
    </Grid>
  );
}

export default SubCategoryNavButton;
