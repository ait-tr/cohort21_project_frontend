import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import HelpCards from '../help_cards/HelpCards';
import CategoryNavButton from './CategoryNavButton';
import SubCategoryNavButton from './SubCategoryNavButton';

function Homepage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleFilter = (value: number | null): void => {
    setSelectedCategory(value);
  };

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <CategoryNavButton handleFilter={handleFilter} />
      <SubCategoryNavButton handleFilter={handleFilter} />
      <Grid container sx={{ mt: '1rem' }} spacing={2}>
        <HelpCards selectedCategory={selectedCategory} />
      </Grid>
    </Box>
  );
}

export default Homepage;
