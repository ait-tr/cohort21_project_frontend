import React from 'react';
import { Box, Typography } from '@mui/material';
import AddHelpCardForm from './AddHelpCardForm';

export default function AddHelpCards(): JSX.Element {
  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <Typography
        textAlign="center"
        fontFamily="Exo"
        fontSize="2.0rem"
        fontWeight={600}
        variant="h4"
        gutterBottom
      >
        Add Card Form
      </Typography>
      <AddHelpCardForm />
    </Box>
  );
}
