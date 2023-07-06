import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  CardActions,
} from '@mui/material';
import { EuroRounded } from '@mui/icons-material';
import User from '../auth/types/User';
import Category from '../categories/types/Category';
import Subcategory from '../subcategories/types/SubСategory';

export default function HelpCard({
  id,
  user,
  image,
  title,
  category,
  subCategory,
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fullDescription,
  price,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isActive,
}: {
  id: number;
  user: User;
  image: string;
  title: string;
  category: Category;
  subCategory: Subcategory;
  description: string;
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
    <Box>
      <Container onClick={handleClick}>
        <Card
          sx={{
            maxWidth: 345,
            minWidth: 345,
            maxHeight: 460,
            my: '1rem',
          }}
          key={id}
        >
          <CardActionArea>
            {image === null ? (
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="offer_image"
              />
            ) : (
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.PUBLIC_URL}/upload/${image}`}
                alt="offer_image"
              />
            )}
            <CardContent>
              <Box>{user.username}</Box>
              <Box
                fontSize="1.35rem"
                component="div"
                overflow="hidden"
                whiteSpace="pre-line"
                textOverflow="ellipsis"
                height={70}
              >
                {title}
              </Box>
              <Box sx={{ mt: 1, mb: 1 }} color="text.secondary">
                {category.title} / {subCategory.title}
              </Box>

              <Typography
                sx={{
                  fontSize: '1rem',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  height: 110,
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ mr: '0.5rem', justifyContent: 'right' }}>
            <EuroRounded />
            <Box fontSize={24}>{price}</Box>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
