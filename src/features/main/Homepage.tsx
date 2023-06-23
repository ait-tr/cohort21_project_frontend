import React from 'react';
import HelpCard from '../help_cards/HelpCard';
import { Container } from '@mui/material';

function Homepage(): JSX.Element {
  return (
    <Container>
      <HelpCard />
      <HelpCard />
      <HelpCard />
      <HelpCard />
      <HelpCard />
      <HelpCard />
    </Container>
  );
}

export default Homepage;
