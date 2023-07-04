import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import { selectUserCards } from './selectors';
import HelpCard from './HelpCard';
import { deleteHelpCard } from './helpCardsSlice';

export default function UserHelpCards(): JSX.Element {
  const userHelpCards = useSelector(selectUserCards);
  const dispatch = useAppDispatch();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [selectedCardId, setSelectedCardId] = React.useState<number>(0);

  const handleOpenDeleteConfirmation = (cardId: number): void => {
    setSelectedCardId(cardId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = (): void => {
    setSelectedCardId(0);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCard = (): void => {
    dispatch(deleteHelpCard(selectedCardId));
    handleCloseDeleteConfirmation();
  };

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch, deleteConfirmationOpen]);

  return (
    <Container>
      <Typography
        fontFamily="Exo"
        fontWeight={600}
        borderTop={2}
        paddingTop={2}
        variant="h5"
        gutterBottom
        textAlign="center"
      >
        You are ready to Help in...
      </Typography>
      <Grid justifyContent="center" container rowSpacing={1} columnSpacing={1}>
        {userHelpCards ? (
          userHelpCards.map((card) => (
            <Grid item key={card.id}>
              <HelpCard
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
              <Grid
                sx={{ mt: -2, mb: 2 }}
                container
                justifyContent="center"
                spacing={1}
              >
                <Grid item>
                  <Button variant="contained" color="primary">
                    Edit Card
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteConfirmation(card.id)}
                  >
                    Delete Card
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <div>
            <h3>Lets start to Help</h3>
          </div>
        )}
      </Grid>

      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete Card</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this card?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDeleteCard} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
