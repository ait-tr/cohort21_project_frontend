import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './features/auth/authSlice';
import helpCardsSlice from './features/help_cards/helpCardsSlice';
import categoriesSlice from './features/categories/categoriesSlice';
import subСategoriesSlice from './features/subcategories/subСategoriesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    helpCards: helpCardsSlice,
    categories: categoriesSlice,
    subCategories: subСategoriesSlice,
  },
});

// для правильной типизации будем использовать useAppDispatch вместо useDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
