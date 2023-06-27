import { RootState } from '../../store';
import Profile from './types/Profile';

export const selectProfile = (state: RootState): Profile => state.profile;
export const selectError = (state: RootState): string | undefined =>
  state.profile.error;