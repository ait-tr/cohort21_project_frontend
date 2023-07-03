import User from '../../auth/types/User';
import Category from '../../categories/types/Category';
import Subcategory from '../../subcategories/types/SubСategory';

export default interface HelpCard {
  id: number;
  user: User;
  title: string;
  category: Category;
  subCategory: Subcategory;
  price: number;
  description: string;
  fullDescription: string;
  isActive: boolean;
}
