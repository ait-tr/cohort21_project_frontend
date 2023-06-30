import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
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

  console.log('categories');
  console.log(categories);

  return (
    <Box
      sx={{
        ml: '3rem',
        width: '100%',
        textAlign: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <Grid container spacing={1}>
        <Button
          sx={{
            borderBottom: '1px solid',
            borderRadius: '0',
            borderColor: 'primary',
            m: '0.5rem',
          }}
          variant="text"
          onClick={() => handleFilter(null)}
        >
          Show All
        </Button>
        {categories?.map((element) => (
          <Button
            sx={{
              borderBottom: '1px solid',
              borderRadius: '0',
              borderColor: 'primary',
              m: '0.5rem',
            }}
            variant="text"
            color="primary"
            key={element.id}
            onClick={() => handleFilter(element.id)}
          >
            {element.title}
          </Button>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryNavButton;
