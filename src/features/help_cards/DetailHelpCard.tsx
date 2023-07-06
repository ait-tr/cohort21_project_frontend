import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  Modal,
  Button,
} from '@mui/material';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectHelpCards } from './selectors';
import { selectUser } from '../auth/selectors';
import HelpCard from './types/HelpCard';
import { getHelpCards } from './helpCardsSlice';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { useAppDispatch } from '../../store';

export default function DetailHelpCard(): JSX.Element {
  const user = useSelector(selectUser);
  const { id } = useParams<{ id: string }>();
  const helpCards = useSelector(selectHelpCards);
  const selectedCard = helpCards.find((card: HelpCard) => card.id.toString() === id);
  const dispatch = useAppDispatch();
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleShowModalLogin = (): void => {
    setOpenModalLogin(true);
  };
  const handleCloseModalLogin = (): void => {
    setOpenModalLogin(false);
  };
  const handleShowModalRegister = (): void => {
    setOpenModalRegister(true);
  };
  const handleCloseModalRegister = (): void => {
    setOpenModalRegister(false);
  };
  useEffect(() => {
    dispatch(getHelpCards());
  }, [dispatch, id]);
  return (
    <Container>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {selectedCard && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
              <img
                height="400"
                width="600"
                src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="compuhter"
                style={{ margin: 'auto' }}
              />
            </Box>
            <Box sx={{ mb: 1.5, mt: 2.5 }} color="text.secondary">
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
            <Box textAlign="right" fontSize={48} p={2}>
              <EuroRoundedIcon />
              {selectedCard.price}
            </Box>
            <Box fontSize={24} textAlign="justify" p={2}>
              {selectedCard.fullDescription}
            </Box>
          </Box>
        )}
        <Box sx={{ ml: 1, mt: 3 }}>
          <Box>
            {selectedCard && (
              <Box fontSize="1.6rem" component="div">
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src={`${process.env.PUBLIC_URL}/upload/${selectedCard.user.avatar}`}
                  sx={{ width: 128, height: 128, mt: '0.5rem' }}
                />
                <Box sx={{ mt: '0.3rem', fontSize: '1.6rem' }}>
                  {selectedCard.user.username}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          {/* <Button variant="contained" color="info" sx={{ mt: '1rem' }}>
            Get Contacts
          </Button> */}
        </Box>
        <Divider variant="middle" />
        <Box sx={{ mt: 1, mb: 4, p: 2, bgcolor: '#d8d8d8' }}>
          {user ? (
            selectedCard && (
              <Box display="flex" alignItems="center">
                <div>
                  <Typography fontSize="1.2rem" gutterBottom>
                    Email: {selectedCard.user.email}
                  </Typography>
                  <Typography fontSize="1.2rem">
                    Phone: {selectedCard.user.phone}
                  </Typography>
                </div>
              </Box>
            )
          ) : (
            <>
              <Typography fontSize="1.2rem" gutterBottom variant="h3">
                In order to obtain Helper contact information, you are required to
                log in or sign up.
              </Typography>
              <Button type="button" onClick={handleShowModalLogin}>
                Login
              </Button>
              <Modal
                open={openModalLogin}
                onClose={handleCloseModalLogin}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{ bgcolor: 'background.paper', width: 500, padding: '2rem' }}
                >
                  <Box>
                    <Login />
                  </Box>
                </Box>
              </Modal>
              <Button type="button" onClick={handleShowModalRegister}>
                Sign In
              </Button>
              <Modal
                open={openModalRegister}
                onClose={handleCloseModalRegister}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{ bgcolor: 'background.paper', width: 500, padding: '2rem' }}
                >
                  <Box>
                    <Register />
                  </Box>
                </Box>
              </Modal>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
