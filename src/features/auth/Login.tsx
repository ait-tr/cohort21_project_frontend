import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Link,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getProfile, getUserCards, login, resetLoginFormError } from './authSlice';
import { selectLoginFormError } from './selectors';
import { useAppDispatch } from '../../store';

export default function Login(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const error = useSelector(selectLoginFormError);
  const [username, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const dispatchResult = await dispatch(
        login({
          username,
          password,
        })
      );

      if (login.fulfilled.match(dispatchResult)) {
        dispatch(getProfile());
        dispatch(getUserCards());

        if (location.pathname === '/auth/login') {
          navigate('/api/users/my/profile');
        } else if (location.pathname.startsWith('/card-details/')) {
          navigate(location.pathname);
        }
      }

      if (login.rejected.match(dispatchResult)) {
        console.error(dispatchResult.error.message);
      }
    },
    [dispatch, username, password, location.pathname, navigate]
  );

  const handleNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
      // 332 очищаем ошибку
      dispatch(resetLoginFormError());
    },
    [dispatch]
  );

  const handlePasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      dispatch(resetLoginFormError());
    },
    [dispatch]
  );

  return (
    <Box sx={{ fontFamily: 'Literata', my: 2 }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <Box sx={{ fontSize: 32, fontWeight: 500, textAlign: 'center' }}>
          Login page
        </Box>
        <Box sx={{ margin: '0 auto' }}>
          <TextField
            autoComplete="false"
            required
            fullWidth
            margin="normal"
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleNameChange}
          />
        </Box>
        <Box sx={{ margin: '0 auto' }}>
          <TextField
            required
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Button variant="contained" type="submit" color="info">
            Log in
          </Button>
          {error && <Box sx={{ display: 'block' }}>{error}</Box>}
        </Box>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Link href="#/auth/register">Not registred? Join us!</Link>
        </Box>
      </form>
    </Box>
  );
}
