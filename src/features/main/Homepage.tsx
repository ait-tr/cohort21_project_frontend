import React from 'react';
import { Container, Grid } from '@mui/material';
import HelpCard from '../help_cards/HelpCard';
import CategoryNavTab from './CategoryNavTab';

function Homepage(): JSX.Element {
  return (
    <Container>
      <CategoryNavTab />
      <Grid container sx={{ mt: '1rem' }} spacing={2}>
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
        <HelpCard />
      </Grid>
    </Container>
  );
}

export default Homepage;
