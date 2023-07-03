import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { useAppDispatch } from '../../store';
import { selectSubcategories } from '../subcategories/selectors';
import { loadSubcategories } from '../subcategories/subcategoriesSlice';

interface SubCategoryNavButtonProps {
  handleFilter: (value: number | null) => void;
}

function SubCategoryNavButton({
  handleFilter,
}: SubCategoryNavButtonProps): JSX.Element {
  const subCategories = useSelector(selectSubcategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSubcategories());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      {subCategories?.map((element) => (
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
