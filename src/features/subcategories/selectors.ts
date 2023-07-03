import { RootState } from '../../store';
import Subcategory from './types/Subcategory';

export const selectSubcategories = (state: RootState): Subcategory[] =>
  state.subcategories.subcategories;
export const selectError = (state: RootState): string | undefined =>
  state.subcategories.error;
