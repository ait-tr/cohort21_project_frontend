import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import HelpCard from '../help_cards/HelpCard';
import CategoryNavButton from './CategoryNavButton';

function Homepage(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFilter = (value: string): void => {
    setSelectedCategory(value);
  };
  // Example data of helpCards
  const helpCards = [
    { id: 1, title: 'Help Card 1', category: 'Care' },
    { id: 2, title: 'Help Card 2', category: 'Education' },
    { id: 3, title: 'Help Card 3', category: 'Home' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    { id: 4, title: 'Help Card 4', category: 'Education' },
    // Add more help card data as needed
  ];

  return (
    <Box>
      <CategoryNavButton handleFilter={handleFilter} />
      <Grid container sx={{ mt: '1rem' }} spacing={2}>
        {selectedCategory === null
          ? helpCards.map((helpCard) => <HelpCard key={helpCard.id} />)
          : helpCards
              .filter((helpCard) => helpCard.category === selectedCategory)
              .map((helpCard) => <HelpCard key={helpCard.id} />)}
      </Grid>
    </Box>
  );
}

export default Homepage;
