import React from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import UserHelpCards from '../help_cards/UserHelpCards';
import AddHelpCard from '../help_cards/AddHelpCard';
import ProfileInfo2 from './ProfileInfo2';

function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);
  useEffect(() => {
    getProfile();
  }, [user]);

  return (
    <Container>
      {user ? (
        <>
          <ProfileInfo2 />
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
