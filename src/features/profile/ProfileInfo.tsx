import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Divider } from '@mui/material';
import { selectUser } from '../auth/selectors';
import { useAppDispatch } from '../../store';
import { editProfile, getUserCards } from '../auth/authSlice';
import ProfileEdit from './ProfileEdit';

function ProfileInfo(): JSX.Element {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileUpdate = async (
    updatedEmail: string,
    updatedPhone: string
  ): Promise<void> => {
    try {
      await dispatch(
        editProfile({
          ...user,
          id: user?.id as number,
          username: user?.username as string,
          email: updatedEmail,
          phone: updatedPhone,
        })
      );
      dispatch(getUserCards()); // !!!!!
      setIsEditingProfile(false);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const handleSave = (): void => {
    setIsEditingProfile(false);
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {user && (
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ mb: 1.5 }} color="text.secondary">
            My Profile
          </Box>
          <Box
            fontSize="h3.fontSize"
            component="div"
            textAlign="center"
            bgcolor="#e4f5ca"
          >
            Welcome, {user.username}
          </Box>
          <Box mt="1rem">{user.email}</Box>
          <Box mt="1rem">{user.phone}</Box>
          <Box justifyItems="right">
            <Button
              type="button"
              variant="contained"
              color="info"
              fullWidth={false}
              sx={{
                mt: '0.3rem',
                mb: '1.5rem',
                maxWidth: '10rem',
                mr: '1rem', // ? при сжатии переместить
              }}
            >
              Add Help offer
            </Button>
            {!isEditingProfile && (
              <Button
                type="button"
                variant="contained"
                color="info"
                fullWidth={false}
                sx={{
                  mt: '0.3rem',
                  mb: '1.5rem',
                  maxWidth: '10rem',
                  mr: '1rem',
                }}
                onClick={() => setIsEditingProfile(true)}
              >
                Edit Profile
              </Button>
            )}

            <Divider variant="middle" />
            {isEditingProfile && (
              <ProfileEdit
                email={email}
                phone={phone}
                setEmail={setEmail}
                setPhone={setPhone}
                handleProfileUpdate={handleProfileUpdate}
                handleSave={handleSave}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProfileInfo;
