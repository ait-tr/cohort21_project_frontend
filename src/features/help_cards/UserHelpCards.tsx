import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useAppDispatch } from '../../store';
import { selectUserCards } from '../auth/selectors';
import { getUserCards } from '../auth/authSlice';

export default function UserHelpCards(): JSX.Element {
  const userHelpCards = useSelector(selectUserCards);
  const dispatch = useAppDispatch();
  console.log('userHelpCards:', userHelpCards);

  useEffect(() => {
    dispatch(getUserCards())
      .unwrap()
      .then((result) => {
        console.log('getUserCards result:', result); // Add this line
      })
      .catch((error) => {
        console.log('getUserCards error:', error); // Add this line
      });
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
