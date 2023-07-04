import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import { selectUserCards } from './selectors';
import HelpCard from './HelpCard';

export default function UserHelpCards(): JSX.Element {
  const userHelpCards = useSelector(selectUserCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center">
        You are ready to Help in...
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {userHelpCards && Array.isArray(userHelpCards) ? (
          userHelpCards.map((card) => (
            <HelpCard
              key={card.id}
              id={card.id}
              title={card.title}
              user={card.user}
              category={card.category}
              subCategory={card.subCategory}
              price={card.price}
              description={card.description}
              fullDescription={card.fullDescription}
              isActive={card.isActive}
            />
          ))
        ) : (
          <div>
            <h3>Lets start to Help</h3>
          </div>
        )}
      </Grid>
    </Container>
  );
}
