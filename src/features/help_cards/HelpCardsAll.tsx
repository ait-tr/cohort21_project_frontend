import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { selectHelpCards } from './selectors';
import { getHelpCards } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import HelpCard from './HelpCard';

interface HelpCardsAllProps {
    selectedCategory: number | null;
  }
export default function HelpCardsAll({ selectedCategory }: HelpCardsAllProps): JSX.Element {
  const helpCards = useSelector(selectHelpCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHelpCards());
  }, [dispatch]);

  const filteredHelpCards = selectedCategory
  ? helpCards?.filter((helpCard) => helpCard.categoryId === selectedCategory)
  : helpCards;

  return (
    <>
     
      <Grid container spacing={2}>
        {filteredHelpCards?.map((helpCard) => (
          <HelpCard
            key={helpCard.id}
            id={helpCard.id}
            categoryId={helpCard.categoryId}
            subCategoryId={helpCard.subCategoryId}
            description={helpCard.description}
          />
        ))}
      </Grid>
    </>
  );
}
