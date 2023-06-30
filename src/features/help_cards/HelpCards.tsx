import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { selectHelpCards } from './selectors';
import { getHelpCards } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import HelpCard from './HelpCard';

interface HelpCardsProps {
  selectedCategory: number | null;
}

export default function HelpCards({
  selectedCategory,
}: HelpCardsProps): JSX.Element {
  const helpCards = useSelector(selectHelpCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHelpCards());
  }, [dispatch]);

  const filteredHelpCards = selectedCategory
    ? helpCards?.filter((helpCard) => helpCard.category.id === selectedCategory)
    : helpCards;
  console.log(selectedCategory);

  return (
    <Grid container spacing={1}>
      {filteredHelpCards?.map((helpCard) => (
        <HelpCard
          key={helpCard.id}
          id={helpCard.id}
          user={helpCard.user}
          title={helpCard.title}
          category={helpCard.category}
          subCategory={helpCard.subCategory}
          fullDescription={helpCard.fullDescription}
          price={helpCard.price}
          isActive={helpCard.isActive}
        />
      ))}
    </Grid>
  );
}
