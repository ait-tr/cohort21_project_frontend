import React, { useEffect } from 'react';
import { Container, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import UserHelpCards from '../help_cards/UserHelpCards';
import ProfileInfo from './ProfileInfo';
import { getProfile } from '../auth/authSlice';

export default function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);
  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <Container>
      {user ? (
        <Container>
          <ProfileInfo />
          <UserHelpCards />
        </Container>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}
