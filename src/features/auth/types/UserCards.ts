import HelpCard from '../../help_cards/types/HelpCard';

export default interface UserCards {
  helpCards: HelpCard[];
  error?: string;
}
