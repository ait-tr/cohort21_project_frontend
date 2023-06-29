import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, TextField } from '@mui/material';
import { selectUser } from '../auth/selectors';
import { useAppDispatch } from '../../store';
import { editProfile, getProfile } from '../auth/authSlice';

function ProfileInfo(): JSX.Element {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileUpdate = async (newEmail: string, newPhone: string) => {
    const dispatchResult = await dispatch(
      editProfile({
        ...user,
        id: user?.id as number,
        username: user?.username as string,
        email: newEmail,
        phone: newPhone,
      })
    );

    if (editProfile.fulfilled.match(dispatchResult)) {
      setEmail(newEmail);
      setPhone(newPhone);
      setIsEditingProfile(false);
    }
  };

  const handleSave = () => {
    setIsEditingProfile(false);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  return (
    <Container>
      {user ? (
        <div>
          <div>id: {user.id}</div>
          <div>username: {user.username}</div>
          <div>role: {user.role}</div>
          <div>email: {isEditingProfile ? email : user.email}</div>
          <div>phone: {isEditingProfile ? phone : user.phone}</div>
          <div>isHelper: {user.isHelper?.toString()}</div>
          <button onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
          {isEditingProfile && (
            <div>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button onClick={() => handleProfileUpdate(email, phone)}>Save</Button>
              <Button onClick={handleSave}>Cancel</Button>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default ProfileInfo;
