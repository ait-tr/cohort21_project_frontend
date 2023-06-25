import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import HelpCard from '../help_cards/HelpCard';
import CategoryNavTab from './CategoryNavTab';

function Homepage(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [searchedCategory, setSearchedCategory] = useState('');

  const handleFilter = (value: string) => {
    setFilter(value);
    setSearchedCategory(value);
  };

  // Sample data for HelpCard components
  const helpCardData = [
    { category: 'care', title: 'HelpCard 1' },
    { category: 'carrier', title: 'HelpCard 2' },
    { category: 'education', title: 'HelpCard 3' },
    { category: 'events', title: 'HelpCard 4' },
    { category: 'housekeeping', title: 'HelpCard 5' },
    { category: 'specialist', title: 'HelpCard 6' },
    { category: 'care', title: 'HelpCard 1' },
    { category: 'carrier', title: 'HelpCard 2' },
    { category: 'care', title: 'HelpCard 1' },
    { category: 'carrier', title: 'HelpCard 2' },
    { category: 'events', title: 'HelpCard 4' },
    { category: 'housekeeping', title: 'HelpCard 5' },
  ];

  // Filter the HelpCard data based on the selected category
  const filteredHelpCardData = helpCardData.filter((card) =>
    filter ? card.category === filter : true
  );

  return (
    <Container>
      <CategoryNavTab handleFilter={handleFilter} />
      {searchedCategory && (
        <Typography variant="h6">Search Results for: {searchedCategory}</Typography>
      )}
      <Grid container sx={{ mt: '1rem' }} spacing={2}>
        {filteredHelpCardData.map((card, index) => (
          <>
            <HelpCard category={card.category} title={card.title} />
          </>
        ))}
      </Grid>
    </Container>
  );
}

export default Homepage;
