import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import HelpCardModal from './HelpCardModal';

export default function HelpCard(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };
  const cardTitle = 'Lizard';
  const cardDescription = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';
  const imageUrl = 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg';

  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpenModal}>
            Learn more
          </Button>
        </CardActions>
      </Card>
      <HelpCardModal
        open={modalOpen}
        onClose={handleCloseModal}
        title={cardTitle}
        description={cardDescription}
        imageUrl={imageUrl}
      />
    </Grid>
  );
}
