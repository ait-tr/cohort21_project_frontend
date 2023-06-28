import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Check, Login } from '@mui/icons-material';

export default function Header(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            noWrap
            variant="h4"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              fontFamily: 'Nunito+Sans',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GetHelp
          </Typography>
          <Button
            sx={{ mt: '1rem', mr: '1rem' }}
            color="inherit"
            href="#/auth/register"
            endIcon={<Check />}
          >
            Sign Up
          </Button>
          <Button
            sx={{ mt: '1rem' }}
            color="inherit"
            href="#/auth/login"
            endIcon={<Login />}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
