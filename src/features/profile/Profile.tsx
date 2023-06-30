import React from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import ProfileInfo from './ProfileInfo';
import UserHelpCards from '../help_cards/UserHelpCards';
import AddHelpCard from '../help_cards/AddHelpCard';

function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);

  return (
    <Container>
      <h3>My Profile Page</h3>
      {user ? (
        <>
          <ProfileInfo />
          <UserHelpCards />
          <AddHelpCard />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default ProfilePage;
