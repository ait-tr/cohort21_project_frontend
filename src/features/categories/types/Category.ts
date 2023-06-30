export default interface Category {
  id: number;
  title: string;
  description: string;
}

export type CategoryId = Category['id'];
