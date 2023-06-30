import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import { selectCategories } from '../categories/selectors';
import { loadCategories } from '../categories/categoriesSlice';
import { useAppDispatch } from '../../store';

interface CategoryNavButtonProps {
  handleFilter: (value: number | null) => void;
}

function CategoryNavButton({
  handleFilter,
}: CategoryNavButtonProps): JSX.Element {
  const categories = useSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        onClick={() => handleFilter(null)}
      >
        <Tab label="Show All Cards" />
        {categories?.map((element) => (
          <Tab
            key={element.id}
            onClick={() => handleFilter(element.id)}
            label={element.title}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategoryNavButton;
