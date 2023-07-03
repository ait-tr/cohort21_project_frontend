import React, { useEffect, useState } from 'react';
import { Box,Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectError } from './selectors';
import { createHelpCard } from './helpCardsSlice';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import AddHelpCardForm from './AddHelpCardForm';

export default function AddHelpCards(): JSX.Element {
 

  return (

    <Box maxWidth={400} mx="auto" p={2}>
      <Typography variant="h4" gutterBottom>
        Добавить карточку
      </Typography>
      <AddHelpCardForm />
    </Box>
  );
}
