import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { register, resetRegisterFormError, login, getUserCards } from './authSlice';
import { selectRegisterFormError } from './selectors';
import { useAppDispatch } from '../../store';

function Register(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const dispatchResult = await dispatch(
        register({
          username,
          password,
          passwordRepeat,
        })
      );

      if (register.fulfilled.match(dispatchResult)) {
        await dispatch(login({ username, password }));
        await dispatch(getUserCards());

        if (location.pathname === '/auth/register') {
          navigate('/api/users/my/profile');
        } else if (location.pathname.startsWith('/card-details/')) {
          navigate(location.pathname);
        }
      }
    },
    [dispatch, username, password, passwordRepeat, location.pathname, navigate]
  );

  const handleNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
      dispatch(resetRegisterFormError());
    },
    [dispatch]
  );

  const handlePasswordChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      dispatch(resetRegisterFormError());
    },
    [dispatch]
  );

  const handlePasswordRepeatChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordRepeat(event.target.value);
      dispatch(resetRegisterFormError());
    },
    [dispatch]
  );

  return (
    <Box sx={{ fontFamily: 'Literata', my: 2 }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <Box sx={{ fontSize: 32, fontWeight: 500, textAlign: 'center' }}>
          Registration page
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
            id="password-input"
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
        <Box sx={{ margin: '0 auto' }}>
          <TextField
            required
            fullWidth
            margin="normal"
            id="password-repeat-input"
            label="Repeat password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={passwordRepeat}
            onChange={handlePasswordRepeatChange}
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
            Sign up
          </Button>
          {error && <Box sx={{ display: 'block' }}>{error}</Box>}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Link href="#/auth/register">Already registered? Login</Link>
        </Box>
      </form>
    </Box>
  );
}

export default Register;
