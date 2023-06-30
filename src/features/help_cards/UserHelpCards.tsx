import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import { selectUserCards } from './selectors';

export default function UserHelpCards(): JSX.Element {
  const userHelpCards = useSelector(selectUserCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch]);

  return (
    <Container>
      <h3>Карточки пользователя</h3>
      <ul>
        {userHelpCards && Array.isArray(userHelpCards) ? (
          userHelpCards.map((element) => (
            <li key={element.id}>
              <b>Card id:</b> {element.id},
              <br />
              <b>Category:</b> {element.category.title},
              <br />
              <b>SubCategory:</b>
              {element.subCategory.title}
              <div>
                <b>Description:</b> {element.description}
              </div>
              <br />
            </li>
          ))
        ) : (
          <div>No user help cards available.</div>
        )}
      </ul>
    </Container>
  );
}
