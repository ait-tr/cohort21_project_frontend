import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { EuroRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectHelpCards } from './selectors';
import HelpCard from './types/HelpCard';

export default function DetailHelpCard(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const helpCards = useSelector(selectHelpCards);

  const selectedCard = helpCards.find((card: HelpCard) => card.id.toString() === id);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {selectedCard && (
        <Box sx={{ my: 3, mx: 2 }}>
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

          <Box fontSize={24} sx={{ textAlign: 'justify', m: 1 }}>
            {selectedCard.fullDescription}
          </Box>
        </Box>
      )}

      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="h5">
          Helper contacts:
        </Typography>
        <Box>
          {selectedCard && (
            <Box fontSize="h3.fontSize" component="div">
              {selectedCard.user.username}
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button variant="contained" color="info">
          Get Contacts
        </Button>
      </Box>
    </Box>
  );
}
