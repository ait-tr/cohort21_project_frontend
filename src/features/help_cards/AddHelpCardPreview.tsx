/* eslint-disable prefer-template */
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import HelpCard from './types/HelpCard';
import { selectHelpCards } from './selectors';

interface AddHelpCardPreviewProp {
  id: string;
}

export default function AddHelpCardPreview({
  id,
}: AddHelpCardPreviewProp): JSX.Element {
  console.log('helpCards -> ' + id);
  const helpCards = useSelector(selectHelpCards);
  console.log('helpCards -> ' + helpCards);
  const selectedCard = helpCards.find((card: HelpCard) => card.id.toString() === id);
  console.log('selectedCard -> ' + selectedCard);

  if (!selectedCard) {
    return (
      <div>
        <Container>
          <CircularProgress />
        </Container>
      </div>
    );
  }
  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <Container>
        {selectedCard && (
          <div>
            <Typography variant="h4" gutterBottom>
              Тут надо сделать красиво
            </Typography>
            <Typography variant="body1" gutterBottom>
              Title: {selectedCard.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: {selectedCard.category.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Subcategory: {selectedCard.subCategory.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Price: {selectedCard.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Full Description: {selectedCard.fullDescription}
            </Typography>
          </div>
        )}
      </Container>
    </Box>
  );
}
