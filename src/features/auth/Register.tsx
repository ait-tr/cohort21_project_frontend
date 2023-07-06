/* eslint-disable no-restricted-globals */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register, resetRegisterFormError, login, getUserCards } from './authSlice';
import { selectRegisterFormError } from './selectors';
import { useAppDispatch } from '../../store';

function Register(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');

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

        if (location.pathname === '/auth/login') {
          navigate('/api/users/my/profile');
          console.log('111');
        } else if (location.pathname.startsWith('/card-details/')) {
          navigate(location.pathname);
          console.log('222');
        }
      }
    },
    [dispatch, username, navigate, password, passwordRepeat]
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
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Registration</h2>
      {error && (
        <div className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name-input" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="name-input"
          name="username"
          value={username}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password-input" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-input"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password-repeat-input" className="form-label">
          Repeat password
        </label>
        <input
          type="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-repeat-input"
          name="passwordRepeat"
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
      <Box sx={{ textAlign: 'center' }}>
        <Button color="success" sx={{ mt: '1rem' }} href="#/auth/login">
          <Typography textTransform="capitalize" textAlign="center">
            Already registred?
          </Typography>
        </Button>
      </Box>
    </form>
  );
}

export default Register;
