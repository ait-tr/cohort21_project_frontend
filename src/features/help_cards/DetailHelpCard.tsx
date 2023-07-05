import React, { useEffect } from 'react';
import { Avatar, Box, Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EuroRounded } from '@mui/icons-material';
import { selectHelpCards } from './selectors';
import { selectUser } from '../auth/selectors';
import HelpCard from './types/HelpCard';
import { getHelpCards } from './helpCardsSlice';
import { useAppDispatch } from '../../store';

export default function DetailHelpCard(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useSelector(selectUser);
  const { id } = useParams<{ id: string }>();
  const helpCards = useSelector(selectHelpCards);
  const selectedCard = helpCards.find((card: HelpCard) => card.id.toString() === id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHelpCards());
  }, [dispatch, id]);

  return (
    <Container>
      <Box sx={{ ml: 1, mt: 5 }}>
        <Box>
          {selectedCard && (
            <Box fontSize="1.6rem" component="div">
              <Avatar
                variant="square"
                alt="Remy Sharp"
                src="https://avatars.mds.yandex.net/i?id=7808f22d2c74cc72b53378dc5b5479650088c558-7663734-images-thumbs&n=13"
                sx={{ width: 128, height: 128, mt: '0.5rem' }}
              />
              <Box sx={{ mt: '1rem' }}>{selectedCard.user.username}</Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Button variant="contained" color="info" sx={{ mt: '1rem' }}>
          Get Contacts
        </Button>
      </Box>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {selectedCard && (
          <Box>
            <Box sx={{ mb: 1.5, mt: '3rem' }} color="text.secondary">
              {selectedCard.category.title} / {selectedCard.subCategory.title}
            </Box>
            <Box
              fontSize="2.2rem"
              component="div"
              textAlign="center"
              bgcolor="#FF9D25"
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
      </Box>
    </Container>
  );
}
