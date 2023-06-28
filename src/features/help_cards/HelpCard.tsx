import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';

function HelpCard({
  id,
  categoryId,
  subCategoryId,
  description,
}: {
  id: number;
  categoryId: number;
  subCategoryId: number;
  description: string;
}): JSX.Element {
  return (
    <Grid item xs={12} md={4} key={categoryId}>
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
              Card id: {id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {categoryId}
              <br />
              Subcategory: {subCategoryId}
              <br />
              Description: {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default HelpCard;
