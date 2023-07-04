import React, { useEffect } from 'react';
import { Container , Box, Button,CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import UserHelpCards from '../help_cards/UserHelpCards';
import AddHelpCard from '../help_cards/AddHelpCard';
import ProfileInfo2 from './ProfileInfo2';
import { getProfile } from '../auth/authSlice';


function ProfilePage(): JSX.Element {
  //const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCard = () => {
   
    navigate('/card'); // Replace '/new-page' with the actual path of the new page you want to navigate to
  };
  
  const user = useSelector(selectUser);
  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <Container>
      {user ? (
        <>

          <ProfileInfo2 />
          <Button
            type="button"
            variant="contained"
            color="info"
            fullWidth={false}
            sx={{ mt: '0.3rem', mb: '1.5rem', maxWidth: '10rem' }}
            onClick={handleAddCard}
          >
            Add Card
          </Button>
          <UserHelpCards />
        </>
      ) : (
        <CircularProgress /> // Loading indicator
      )}
    </Container>
  );
}

export default ProfilePage;
