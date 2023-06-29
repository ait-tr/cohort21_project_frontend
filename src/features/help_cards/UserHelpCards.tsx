import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectHelpCards } from './selectors';
import { useAppDispatch } from '../../store';
import { selectUserCards } from '../auth/selectors';
import { getUserCards } from '../auth/authSlice';

export default function UserHelpCards(): JSX.Element {
  const helpCards2 = useSelector(selectUserCards);
  const helpCards = useSelector(selectHelpCards);
  console.log('selectUserCards');
  console.log(helpCards2);
  console.log('selectHelpCards');
  console.log(helpCards);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch]);

  return (
    <>
      <h3>Карточки пользователя</h3>
      <ul>
        {helpCards.map((element) => (
          <li key={element.id}>
            Card id:{element.id}, CategoryID:{element.categoryId}, SubCategoryID:
            {element.subCategoryId} <div>Description:</div>{' '}
            <div>{element.description}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
