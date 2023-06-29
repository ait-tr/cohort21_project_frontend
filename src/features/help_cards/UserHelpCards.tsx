import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { selectUserCards } from '../auth/selectors';
import { getUserCards } from '../auth/authSlice';

export default function UserHelpCards(): JSX.Element {
  const userHelpCards = useSelector(selectUserCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch]);

  if (!Array.isArray(userHelpCards)) {
    return <div>No user help cards available.</div>;
  }

  return (
    <>
      <h3>Карточки пользователя</h3>
      <ul>
        {userHelpCards.map((element) => (
          <li key={element.id}>
            Card id: {element.id}, CategoryID: {element.categoryId}, SubCategoryID:{' '}
            {element.subCategoryId}
            <div>Description:</div>
            <div>{element.description}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
