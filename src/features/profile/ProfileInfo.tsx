import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Divider } from '@mui/material';
import { selectUser } from '../auth/selectors';
import { useAppDispatch } from '../../store';
import { editProfile, getUserCards } from '../auth/authSlice';
import ProfileEdit from './ProfileEdit';
import UploadForm from '../main/UploadForm';

export default function ProfileInfo(): JSX.Element {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleAddCard = (): void => {
    navigate('/card');
  };

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
      dispatch(getUserCards());
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
    <Box sx={{ width: '100%', bgcolor: 'background.paper', fontFamily: 'Exo' }}>
      {user && (
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ mb: 1.5 }} color="text.secondary">
            My Profile
          </Box>
          <Box
            fontSize="h4.fontSize"
            fontWeight={600}
            component="div"
            textAlign="center"
            bgcolor="#FF9d25"
          >
            Welcome, {user.username}
          </Box>
          <Avatar
            variant="square"
            alt="avatar"
            src={`${process.env.PUBLIC_URL}/upload/${user.avatar}`}
            sx={{ width: 128, height: 128, mt: '1rem' }}
          />
          {!showUploadForm && (
            <Button
              sx={{ mt: 1, fontSize: '0.74rem' }}
              variant="contained"
              size="small"
              color="info"
              onClick={() => setShowUploadForm(true)}
            >
              Change image
            </Button>
          )}
          {showUploadForm && <UploadForm onClose={() => setShowUploadForm(false)} />}
          <Box fontWeight={600} mt="0.5rem">
            Email: {user.email}
          </Box>
          <Box fontWeight={600} mb="0.5rem">
            Phone: {user.phone}
          </Box>
          <Box>
            {!isEditingProfile && (
              <>
                <Button
                  type="button"
                  variant="contained"
                  color="info"
                  fullWidth={false}
                  sx={{
                    maxWidth: '10rem',
                    mr: '1rem',
                  }}
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit Contacts
                </Button>
                {user.role !== 'ADMIN' ? (
                  <Button
                    onClick={handleAddCard}
                    type="button"
                    variant="contained"
                    color="info"
                    fullWidth={false}
                    sx={{
                      maxWidth: '12rem',
                      mr: '1rem',
                    }}
                  >
                    Add Help Offer
                  </Button>
                ) : (
                  <Divider variant="middle" />
                )}
              </>
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
