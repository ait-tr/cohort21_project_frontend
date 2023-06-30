import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHelpCards } from './selectors';

export default function DetailHelpCard(): JSX.Element {
  const HelpCard = useSelector(selectHelpCards);

  return <Grid>test</Grid>;
}
