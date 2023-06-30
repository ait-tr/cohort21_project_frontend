import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import HelpCard from './types/HelpCard';
import { selectHelpCards } from './selectors';

export default function DetailHelpCard(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const helpCards = useSelector(selectHelpCards);

  const selectedCard = helpCards.find((card: HelpCard) => card.id.toString() === id);
  return (
    <div>
      <Container>
        {selectedCard && (
          <div>
            <h3>Тут надо сделать красиво</h3>
            <div>Title: {selectedCard.title}</div>
            <div>category: {selectedCard.category.title}</div>
            <div>subCategory: {selectedCard.subCategory.title}</div>
            <div>price: {selectedCard.price}</div>
            <div>fullDescription: {selectedCard.fullDescription}</div>
          </div>
        )}
      </Container>
    </div>
  );
}
