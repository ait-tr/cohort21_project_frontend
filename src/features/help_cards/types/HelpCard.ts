export default interface HelpCard {
  id: number;
  name: string;
  description: string;
}

export type HelpCardId = HelpCard['id'];
