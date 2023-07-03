import Subcategory from './types/Subcategory';

export async function getSubcategories(): Promise<{
  subcategories: Subcategory[];
}> {
  const result = await fetch('/api/subcategories');
  return result.json();
}

export async function createSubCategory(
  title: string,
  description: string,
  categoryId: number
): Promise<Subcategory> {
  const res = await fetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify({ title, description, categoryId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status >= 400) {
    const { message } = await res.json();
    throw Error(message);
  }

  return res.json();
}
