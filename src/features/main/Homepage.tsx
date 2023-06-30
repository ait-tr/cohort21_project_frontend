import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import HelpCards from '../help_cards/HelpCards';
import CategoryNavButton from './CategoryNavButton';

function Homepage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleFilter = (value: number | null): void => {
    setSelectedCategory(value);
  };
  console.log('Homepage');
  console.log(selectedCategory);

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <CategoryNavButton handleFilter={handleFilter} />
      <Grid container sx={{ mt: '1rem' }} spacing={2}>
        <HelpCards selectedCategory={selectedCategory} />
      </Grid>
    </Box>
  );
}

export default Homepage;
