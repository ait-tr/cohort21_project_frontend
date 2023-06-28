import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import HelpCardsAll from '../help_cards/HelpCardsAll';
import CategoryNavButton from './CategoryNavButton';

function Homepage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleFilter = (value: number | null) => {
    setSelectedCategory(value);
  };

 
  return (
    <Container>
      <CategoryNavButton handleFilter={handleFilter} />
      <Grid container sx={{ mt: '1rem' }} spacing={2}>
      <HelpCardsAll selectedCategory={selectedCategory} />
      </Grid>
    </Container>
  );
}

export default Homepage;
