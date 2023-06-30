import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useAppDispatch } from '../../store';
import { selectUserCards } from '../auth/selectors';
import { getUserCards } from '../auth/authSlice';

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
            Card id: {element.id}, CategoryID: {element.categoryId}, SubCategoryID:{' '}
            {element.subCategoryId}
            <div>Description:</div>
            <div>{element.description}</div>
          </li>
        ))
      ) : (
        <div>No user help cards available.</div>
      )}
    </ul>
  </Container>
);

}
