import { RootState } from '../../store';
import SubCategory from './types/SubСategory';

export const selectSubCategories = (state: RootState): SubCategory[] =>
  state.subCategories.subCategories;
export const selectError = (state: RootState): string | undefined =>
  state.subCategories.error;
