import HelpCard from '../../help_cards/types/HelpCard';

export default interface Profile {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  isHelper: boolean;
  cards: HelpCard[];
}

// где это используется
export type ProfileId = Profile['id'];
