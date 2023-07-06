import React, { useEffect, useState } from 'react';
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
  Box,
  TextField
} from '@mui/material';
import { useAppDispatch } from '../../store';
import { getUserCards } from '../auth/authSlice';
import { selectUserCards } from './selectors';
import { deleteHelpCard } from './helpCardsSlice';
import { useNavigate } from 'react-router-dom';
import { getHelpCard, updateHelpCard } from './api';
import HelpCard from './types/HelpCard';


export default function AdminHelpCards(): JSX.Element {
  const userHelpCards = useSelector(selectUserCards);
  const dispatch = useAppDispatch();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [selectedHelpCardId, setselectedHelpCardId] = React.useState<number>(0);
  const navigate = useNavigate();

  const [selectedHelpCard, setSelectedHelpCard] = useState<HelpCard | null>(null);

const fetchHelpCard = async (cardId: number) => {
  try {
    const helpCard = await getHelpCard(cardId);
    setSelectedHelpCard(helpCard);
  } catch (error) {
    setSelectedHelpCard(null);
  }
};

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  fetchHelpCard(selectedHelpCardId);
};

  const handleOpenDeleteConfirmation = (cardId: number): void => {
    setselectedHelpCardId(cardId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = (): void => {
    setselectedHelpCardId(0);
    setDeleteConfirmationOpen(false);
  };

  const handleEditHelpCard = (cardId: number): void => {
    navigate(`/card/${cardId}`);
  };
  const handleDeleteCard = (): void => {
    dispatch(deleteHelpCard(selectedHelpCardId));
    handleCloseDeleteConfirmation();
  };

  useEffect(() => {
    dispatch(getUserCards());
  }, [dispatch, setselectedHelpCardId]);

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
        Find Card By Id...
      </Typography>
      <Grid justifyContent="center" container rowSpacing={1} columnSpacing={1}>
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
            <Button type="submit" variant="contained" color="primary">
              Find
            </Button>
          </Box>
        </form>
      </Grid>
  
      <Container>
        {selectedHelpCard ? (
          <>
           <Typography>id: {selectedHelpCard.id}</Typography>
           <Typography>Title: {selectedHelpCard.title}</Typography>
           </>
        ) : (
          <div>
            <h3>No Cards with id</h3>
          </div>
        )}
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditHelpCard(selectedHelpCardId)}
              disabled={!selectedHelpCard}
            >
              Edit Card
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleOpenDeleteConfirmation(selectedHelpCardId)}
              disabled={!selectedHelpCard}
            >
              Delete Card
            </Button>
          </Grid>
        </Grid>
      </Container>
  
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
