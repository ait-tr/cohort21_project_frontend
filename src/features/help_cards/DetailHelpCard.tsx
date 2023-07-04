import React from 'react';
import { Avatar, Box, Button, Container, Divider, Typography } from '@mui/material';
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
    <Container>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {selectedCard && (
          <Box>
            <Box sx={{ mb: 1.5, mt: 2.5 }} color="text.secondary">
              {selectedCard.category.title} / {selectedCard.subCategory.title}
            </Box>
            <Box
              fontSize="2.2rem"
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
        <Box sx={{ ml: 1, mt: 5 }}>
          <Typography
            bgcolor="#d8d8d8"
            padding={2}
            fontSize="1.2rem"
            gutterBottom
            variant="h5"
          >
            Helper info:
          </Typography>
          <Box>
            {selectedCard && (
              <Box fontSize="1.6rem" component="div">
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src="https://avatars.mds.yandex.net/i?id=7808f22d2c74cc72b53378dc5b5479650088c558-7663734-images-thumbs&n=13"
                  sx={{ width: 128, height: 128, mt: '0.5rem' }}
                />
                {selectedCard.user.username}
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <Button variant="contained" color="info">
            Get Contacts
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
