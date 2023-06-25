import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Check, Login } from '@mui/icons-material';

function Header(): JSX.Element {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            align="right"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Nunito+Sans',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GetHelp
          </Typography>
        </Toolbar>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            sx={{ mb: '1rem', mr: '1rem' }}
            color="inherit"
            href="#/auth/register"
            endIcon={<Check />}
          >
            Sign Up
          </Button>
          <Button
            sx={{ mb: '1rem' }}
            color="inherit"
            href="#/auth/login"
            endIcon={<Login />}
          >
            Login
          </Button>
        </div>
      </Container>
    </AppBar>
  );
}
export default Header;
