import React from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import ProfileInfo from './ProfileInfo';
import UserHelpCards from '../help_cards/UserHelpCards';
import AddHelpCard from '../help_cards/AddHelpCard';
import { Button } from '@mui/base';

function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCard = () => {
   
    navigate('/card'); // Replace '/new-page' with the actual path of the new page you want to navigate to
  };


  return (
    <Container>
      <h3>My Profile Page</h3>
      {user ? (
        <>
          <ProfileInfo />
          <UserHelpCards />
          <Button type="button" onClick={handleAddCard}> Add Card</Button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default ProfilePage;
