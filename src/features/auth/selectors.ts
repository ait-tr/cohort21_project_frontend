import { RootState } from '../../store';
import HelpCard from '../help_cards/types/HelpCard';
import User from './types/User';

export const selectAuthChecked = (state: RootState): boolean =>
  state.auth.authChecked;
export const selectUser = (state: RootState): User | undefined => state.auth.user;
export const selectUserCards = (state: RootState): HelpCard[] | undefined =>
  state.auth.user?.cards;
export const selectLoginFormError = (state: RootState): string | undefined =>
  state.auth.loginFormError;
export const selectRegisterFormError = (state: RootState): string | undefined =>
  state.auth.registerFormError;
