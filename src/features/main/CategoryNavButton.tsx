import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Grid } from '@mui/material';
import { selectCategories } from '../categories/selectors';
import { loadCategories } from '../categories/categoriesSlice';
import { useAppDispatch } from '../../store';
import { selectSubCategories } from '../subcategories/selectors';
import { loadSubCategories } from '../subcategories/subcategoriesSlice';

interface CategoryNavButtonProps {
  handleFilter: (category: number | null, subCategory: number | null) => void;
}

function CategoryNavButton({ handleFilter }: CategoryNavButtonProps): JSX.Element {
  const categories = useSelector(selectCategories);
  const subCategories = useSelector(selectSubCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleCategoryClick = (categoryId: number | null, subCategoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(subCategoryId);
    handleFilter(categoryId,subCategoryId);
    
  };

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadSubCategories());
  }, [dispatch]);

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
          onClick={() => handleCategoryClick(null,null)}
        >
          Show All
        </Button>
        {categories?.map((category) => (
          <Button
            sx={{
              borderBottom: '1px solid',
              borderRadius: '0',
              borderColor: 'primary',
              m: '0.5rem',
            }}
            variant="text"
            key={category.id}
            onClick={() => handleCategoryClick(category.id,null)}
          >
            {category.title}
          </Button>
        ))}
        {selectedCategoryId &&
          subCategories
            ?.filter((subcategory) => subcategory.categoryId === selectedCategoryId)
            .map((subcategory) => (
              <Button
                variant="contained"
                color="primary"
                key={subcategory.id}
                onClick={() => handleFilter(selectedCategoryId,subcategory.id,)}
              >
                {subcategory.title}
              </Button>
            ))}
      </Grid>
    </Box>
  );
}

export default CategoryNavButton;
