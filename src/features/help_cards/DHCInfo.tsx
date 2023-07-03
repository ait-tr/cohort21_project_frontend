import React from 'react';
import { Box, Divider } from '@mui/material';
import { EuroRounded } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectHelpCards } from './selectors';
import HelpCard from './types/HelpCard';

function DHCInfo(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const helpCards = useSelector(selectHelpCards);

  const selectedCard = helpCards.find(
    (card: HelpCard) => card.id.toString() === id
  );
  return (
    <Box flex={4} p={2}>
      {selectedCard && (
        <Box>
          <Box sx={{ mb: 1.5 }} color="text.secondary">
            {selectedCard.category.title} / {selectedCard.subCategory.title}
          </Box>

          <Box
            fontSize="h3.fontSize"
            component="div"
            textAlign="center"
            bgcolor="#e4f5ca"
          >
            {selectedCard.title}
          </Box>

          <Box textAlign="right" fontSize={48}>
            <EuroRounded />
            {selectedCard.price}
          </Box>

          <Box fontSize={24}>{selectedCard.fullDescription}</Box>
        </Box>
      )}
      <Divider variant="middle" />
    </Box>
  );
}

export default DHCInfo;
