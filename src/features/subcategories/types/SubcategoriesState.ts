import Subcategory from './Subcategory';

export default interface SubcategoriesState {
  subcategories: Subcategory[];
  error?: string;
}
