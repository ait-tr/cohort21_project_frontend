import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.6)' }}
    >
      •
    </Box>
  );
const card = (
    <>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'`&quot;`a benevolent smile`&quot;`'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </ >
);

export default function Cards(): JSX.Element {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item><Card variant="outlined">{card}</Card></Item>
                </Grid>
                <Grid item xs={3}>
                    <Item><Card variant="outlined">{card}</Card></Item>
                </Grid>
                <Grid item xs={3}>
                    <Item><Card variant="outlined">{card}</Card></Item>
                </Grid>
                <Grid item xs={3}>
                    <Item><Card variant="outlined">{card}</Card></Item>
                </Grid>
            </Grid>
        </Box>
    );
}
