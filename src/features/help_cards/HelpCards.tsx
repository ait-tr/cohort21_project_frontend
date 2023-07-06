/* eslint-disable prefer-template */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { selectHelpCards } from './selectors';
import { getHelpCards } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import HelpCard from './HelpCard';

interface HelpCardsProps {
  selectedCategory: number | null;
  selectedSubCategory: number | null;
}

export default function HelpCards({
  selectedCategory,
  selectedSubCategory,
}: HelpCardsProps): JSX.Element {
  const helpCards = useSelector(selectHelpCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHelpCards());
  }, [dispatch]);
  const filteredHelpCards = helpCards?.filter((helpCard) => {
    if (selectedCategory && selectedCategory !== helpCard.category.id) {
      return false;
    }
    if (selectedSubCategory && selectedSubCategory !== helpCard.subCategory.id) {
      return false;
    }
    return true;
  });

  return (
    <Grid container p={2} spacing={1}>
      {filteredHelpCards?.map((helpCard) => (
        <HelpCard
          key={helpCard.id}
          id={helpCard.id}
          user={helpCard.user}
          title={helpCard.title}
          category={helpCard.category}
          subCategory={helpCard.subCategory}
          description={helpCard.description}
          fullDescription={helpCard.fullDescription}
          price={helpCard.price}
          isActive={helpCard.isActive}
        />
      ))}
    </Grid>
  );
}
