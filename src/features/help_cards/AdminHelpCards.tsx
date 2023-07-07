import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from '@mui/material';
import { getUserCards } from '../auth/authSlice';
import { deleteHelpCard } from './helpCardsSlice';
import { getHelpCard } from './api';
import HelpCard from './types/HelpCard';
import { useAppDispatch } from '../../store';
import HelpCardFile from './HelpCard';

export default function AdminHelpCards(): JSX.Element {
  const dispatch = useAppDispatch();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [selectedHelpCardId, setselectedHelpCardId] = React.useState<number>(0);
  const [isFinding, setIsFinding] = useState(false);
  const [choosedId, setChoosedId] = useState(0);
  const [selectedHelpCard, setSelectedHelpCard] = useState<HelpCard | null>(null);

  const fetchHelpCard = async (cardId: number): Promise<void> => {
    try {
      const helpCard = await getHelpCard(cardId);
      setSelectedHelpCard(helpCard);
    } catch (error) {
      setSelectedHelpCard(null);
    }
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    fetchHelpCard(selectedHelpCardId);
    setChoosedId(selectedHelpCardId);
    setIsFinding(true);
  };

  const handleOpenDeleteConfirmation = (cardId: number): void => {
    setselectedHelpCardId(cardId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = (): void => {
    setselectedHelpCardId(0);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCard = (): void => {
    dispatch(deleteHelpCard(selectedHelpCardId));
    setselectedHelpCardId(0);
    handleCloseDeleteConfirmation();
  };

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch, setselectedHelpCardId]);

  return (
    <Container>
      <Typography borderTop={2} paddingTop={2} variant="h6" gutterBottom>
        Find/Delete Offer By Id
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              type="text"
              placeholder="Id..."
              aria-label="Id..."
              title="id"
              value={selectedHelpCardId}
              onChange={(e) => setselectedHelpCardId(Number(e.target.value))}
            />
            <Button sx={{ mx: 1 }} type="submit" variant="contained" color="primary">
              Find
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleOpenDeleteConfirmation(selectedHelpCardId)}
              disabled={!selectedHelpCard}
            >
              Delete
            </Button>
          </Box>
        </form>
      </Grid>

      <Container sx={{ mb: 5, pb: 2, borderBottom: 2 }}>
        {selectedHelpCard ? (
          <HelpCardFile
            id={selectedHelpCard.id}
            user={selectedHelpCard.user}
            image={selectedHelpCard.image}
            title={selectedHelpCard.title}
            category={selectedHelpCard.category}
            subCategory={selectedHelpCard.subCategory}
            description={selectedHelpCard.description}
            fullDescription={selectedHelpCard.fullDescription}
            price={selectedHelpCard.price}
            isActive={selectedHelpCard.isActive}
          />
        ) : null}
        {isFinding && !selectedHelpCard && (
          <Typography textAlign="left" paddingTop={2} variant="h6" gutterBottom>
            No Offers with ID: {choosedId}
          </Typography>
        )}
      </Container>

      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete Card</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this offer?
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
