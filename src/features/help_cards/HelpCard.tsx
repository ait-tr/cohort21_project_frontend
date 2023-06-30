import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardActions,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@mui/material';
import User from '../auth/types/User';
import Category from '../categories/types/Category';
import Subcategory from '../subcategories/types/Subcategory';

export default function HelpCard({
  id,
  user,
  title,
  category,
  subCategory,
  fullDescription,
  price,
  isActive,
}: {
  id: number;
  user: User;
  title: string;
  category: Category;
  subCategory: Subcategory;
  fullDescription: string;
  price: number;
  isActive: boolean;
}): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/card-details/${id}`);
  };

  useEffect(() => {
    const cardData = (data: any): { type: string; payload: number } => ({
      type: 'CardData',
      payload: data,
    });
    dispatch(cardData(id));
  }, [dispatch, id]);

  return (
    <Grid item xs={12} md={3}>
      <Container onClick={handleClick}>
        <Card sx={{ maxWidth: 345 }} key={id}>
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
                Title: {title}
                <br />
                User: {user.username}
                <br />
                Category: {category.title}
                <br />
                Subcategory: {subCategory.title}
                <br />
                Description: {fullDescription}
                <br />
                isActive: {isActive.toString()}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>Price: {price}</CardActions>
        </Card>
      </Container>
    </Grid>
  );
}
