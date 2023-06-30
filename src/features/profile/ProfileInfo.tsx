import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
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

  const handleProfileUpdate = async (updatedEmail: string, updatedPhone: string): Promise<void> => {
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
    <Container>
      {user && (
        <div>
          <div>id: {user.id}</div>
          <div>username: {user.username}</div>
          <div>role: {user.role}</div>
          <div>email: {isEditingProfile ? email : user.email}</div>
          <div>phone: {isEditingProfile ? phone : user.phone}</div>
          <div>isHelper: {user.isHelper?.toString()}</div>
          {!isEditingProfile && (
            <button type="button" onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
          )}
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
        </div>
      )}
    </Container>
  );
}

export default ProfileInfo;
