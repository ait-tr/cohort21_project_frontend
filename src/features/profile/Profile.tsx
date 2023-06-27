import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/selectors';
import { useAppDispatch } from '../../store';
import { editProfile, getProfile } from './profileSlice';

function ProfilePage(): JSX.Element {
  const user = useSelector(selectUser);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const dispatchResult = await dispatch(editProfile({ ...user, email, phone }));
      if (editProfile.fulfilled.match(dispatchResult)) {
        setEmail('');
        setPhone('');
      }
    },
    [dispatch, email, phone]
  );
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Container>
      <h3> My profile page</h3>
      <FormControl sx={{ mt: '2rem' }}>
        <Grid container sx={{ mt: '1rem' }} rowSpacing={1} direction="column">
          {user ? (
            <>
              <div> id: {user.id}</div>
              <div> username: {user.username}</div>
              <div> role: {user.role}</div>
              <div> email: {user.email}</div>
              <div> phone: {user.phone}</div>
              <div> isHelper: {user.isHelper}</div>

              <div>
                <TextField
                  sx={{ mt: '1rem' }}
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  sx={{ mt: '1rem' }}
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  size="small"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth={false}
                sx={{ mt: '1rem', maxWidth: '5rem' }}
              >
                Accept
              </Button>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
      </FormControl>
    </Container>
  );
}

export default ProfilePage;
