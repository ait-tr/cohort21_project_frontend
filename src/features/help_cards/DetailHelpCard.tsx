import React, { useEffect } from 'react';
import { Avatar, Box, Container, Divider, Typography } from '@mui/material';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { selectHelpCards } from './selectors';
import { selectUser } from '../auth/selectors';
import HelpCard from './types/HelpCard';
import { getHelpCards } from './helpCardsSlice';
import Login from '../auth/Login';

export default function DetailHelpCard(): JSX.Element {
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
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {selectedCard && (
          <Box>
            <Box sx={{ mb: 1.5, mt: 2.5 }} color="text.secondary">
              {selectedCard.category.title} / {selectedCard.subCategory.title}
            </Box>
            <Box fontSize="2.2rem" component="div" textAlign="center" bgcolor="#e4f5ca" p={2}>
              {selectedCard.title}
            </Box>

            <Box textAlign="right" fontSize={48} p={2}>
              <EuroRoundedIcon />
              {selectedCard.price}
            </Box>

            <Box fontSize={24} textAlign="justify" p={2}>
              {selectedCard.fullDescription}
            </Box>
          </Box>
        )}

        <Divider variant="middle" />

        <Box sx={{ mt: 5, p: 2, bgcolor: '#d8d8d8' }}>
          <Typography fontSize="1.2rem" gutterBottom variant="h5">
            Helper info:
          </Typography>
          {user ? (
            selectedCard && (
              <Box fontSize="1.6rem" display="flex" alignItems="center">
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src="https://avatars.mds.yandex.net/i?id=7808f22d2c74cc72b53378dc5b5479650088c558-7663734-images-thumbs&n=13"
                  sx={{ width: 128, height: 128, mr: '0.5rem' }}
                />
                <div>
                  <Typography variant="h6" gutterBottom>
                    {selectedCard.user.username}
                  </Typography>
                  <Typography fontSize="1.6rem" gutterBottom>
                    Email: {selectedCard.user.email}
                  </Typography>
                  <Typography fontSize="1.6rem" gutterBottom>
                    Phone: {selectedCard.user.phone}
                  </Typography>
                </div>
              </Box>
            )
          ) : (
            <>
              <Typography>Contact Information Only for authorisated Users</Typography>
              <Login />
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
