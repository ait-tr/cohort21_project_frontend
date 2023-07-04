import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import HelpCards from '../help_cards/HelpCards';
import CategoryNavButton from './CategoryNavButton';

function Homepage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );
  const handleFilter = (
    category: number | null,
    subCategory: number | null
  ): void => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
  };

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <CategoryNavButton handleFilter={handleFilter} />
      <Grid container sx={{ mt: '1rem', ml: '1rem' }} spacing={2}>
        <HelpCards
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
        />
      </Grid>
    </Box>
  );
}
export default Homepage;
