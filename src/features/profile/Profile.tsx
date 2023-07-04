import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import UserHelpCards from '../help_cards/UserHelpCards';
import AddHelpCard from '../help_cards/AddHelpCard';
import { getProfile } from '../auth/authSlice';
import ProfileInfo from './ProfileInfo';

function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);
  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <Box>
      {user ? (
        <>
          <Container>
            <ProfileInfo />
          </Container>
          <UserHelpCards />
          <AddHelpCard />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

export default ProfilePage;
