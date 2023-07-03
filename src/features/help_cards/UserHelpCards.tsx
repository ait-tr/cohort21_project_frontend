import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
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
      <h3>Карточки пользователя</h3>
      <div>
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
          <div>No user help cards available.</div>
        )}
      </div>
    </Container>
  );
}
