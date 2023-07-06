import React, { useEffect } from 'react';
import { Container, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import UserHelpCards from '../help_cards/UserHelpCards';
import ProfileInfo from './ProfileInfo';
import { getProfile } from '../auth/authSlice';
import Categories from '../categories/Categories';
import AdminHelpCards from '../help_cards/AdminHelpCards';

export default function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);
  const role = user?.role;

  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <Container>
      {user ? (
        role === 'ADMIN' ? (
          <Container>
            <ProfileInfo />
            <Categories />
            <AdminHelpCards />
          </Container>
        ) : (
          <Container>
            <ProfileInfo />
            <UserHelpCards />
          </Container>
        )
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}
