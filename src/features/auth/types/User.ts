import HelpCard from '../../help_cards/types/HelpCard';

export default interface User {
  id: number;
  username: string;
  role?: string;
  email?: string;
  phone?: string;
  isHelper?: boolean;
  cards?: HelpCard[];
}
