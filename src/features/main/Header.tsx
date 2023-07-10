import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Check, Login, Logout } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../auth/authSlice';
import { selectUser } from '../auth/selectors';
import { useAppDispatch } from '../../store';

export default function Header(): JSX.Element {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const dispatchResult = await dispatch(logout());

      if (logout.fulfilled.match(dispatchResult)) {
        dispatch(getProfile());
        navigate('/auth/login');
      }

      if (logout.rejected.match(dispatchResult)) {
        console.error(dispatchResult.error.message);
      }
    },
    [dispatch, navigate]
  );
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          noWrap
          variant="body1"
          component="a"
          href="/"
          sx={{
            ml: '1rem',
            flexGrow: 1,
            fontSize: '2rem',
            fontFamily: 'Exo',
            fontWeight: 600,
            letterSpacing: '.15rem',
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: '#ff9d25',
            },
          }}
        >
          GetHelp
        </Typography>
        {user ? (
          <>
            <Box>
              <IconButton
                href="#/api/users/my/profile"
                sx={{
                  color: 'white',
                  p: 0,
                  '&:hover': {
                    color: '#ff9d25',
                  },
                }}
              >
                <Avatar
                  alt="avatar"
                  src={`${process.env.PUBLIC_URL}/upload/${user.avatar}`}
                />

                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    display: 'inline-block',
                    padding: '6px 16px 6px 5px',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    fontFamily: 'Literata',
                    textTransform: 'uppercase',
                    color: 'inherit',
                  }}
                >
                  Account
                </Typography>
              </IconButton>
            </Box>
            <Button
              onClick={handleLogout}
              sx={{
                mr: '1rem',
                '&:hover': {
                  color: '#ff9d25',
                },
              }}
              color="inherit"
              href="#/auth/login"
              endIcon={<Logout />}
            >
              LogOut
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                mr: '1rem',
                '&:hover': {
                  color: '#ff9d25',
                },
              }}
              color="inherit"
              href="#/auth/register"
              endIcon={<Check />}
            >
              Sign Up
            </Button>
            <Button
              sx={{
                mr: '1rem',
                '&:hover': {
                  color: '#ff9d25',
                },
              }}
              color="inherit"
              href="#/auth/login"
              endIcon={<Login />}
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
