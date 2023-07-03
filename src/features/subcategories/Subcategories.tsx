import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSubCategories } from './selectors';
import { useAppDispatch } from '../../store';
import { loadSubCategories } from './subCategoriesSlice';

export default function SubCategories(): JSX.Element {
  const subCategories = useSelector(selectSubCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSubCategories());
  }, [dispatch]);

  return (
    <Box>
      <Container>
        <div>
          {subCategories.map((subCategory) => (
            <div key={subCategory.id}>{subCategory.description}</div>
          ))}
        </div>
      </Container>
    </Box>
  );
}
