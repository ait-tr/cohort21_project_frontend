import Categories from './types/Category';
import { RootState } from '../../store';

export const selectCategories = (state: RootState): Categories[] =>
  state.categories.categories;
export const selectError = (state: RootState): string | undefined =>
  state.categories.error;
