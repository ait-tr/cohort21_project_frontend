import React, { useState } from 'react';
import { Box } from '@mui/material';
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
      <HelpCards
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
      />
    </Box>
  );
}
export default Homepage;
