export default interface SubCategory {
  id: number;
  title: string;
  description: string;
  categoryId: number;
}

export type SubCategoryId = SubCategory['id'];
