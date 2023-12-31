import { RootState } from '../../store';
import HelpCard from './types/HelpCard';

export const selectHelpCards = (state: RootState): HelpCard[] =>
  state.helpCards.helpCards;
export const selectUserCards = (state: RootState): HelpCard[] | undefined =>
  state.auth.userCards?.helpCards;
export const selectError = (state: RootState): string | undefined =>
  state.helpCards.error;
