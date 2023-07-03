import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectHelpCards } from './selectors';
import HelpCard from './types/HelpCard';

function DHCContact(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const helpCards = useSelector(selectHelpCards);

  const selectedCard = helpCards.find(
    (card: HelpCard) => card.id.toString() === id
  );

  return (
    <Box flex={2}>
      <Typography variant="h5" textAlign="center">
        Helper
      </Typography>
      {selectedCard && (
        <Box fontSize="h3.fontSize" component="div" textAlign="center">
          {selectedCard.user.username}
        </Box>
      )}

      <Box textAlign="center" component="div">
        <Button variant="contained" color="info">
          Get Contacts
        </Button>
      </Box>
    </Box>
  );
}

export default DHCContact;
