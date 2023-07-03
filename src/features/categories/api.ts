import Categories, { CategoryId } from './types/Category';

export async function createCategory(
  title: string,
  description: string
): Promise<Categories> {
  const res = await fetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
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

export async function updateCategory(
  id: CategoryId,
  updatedCategory: Categories
): Promise<void> {
  await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedCategory),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteCategories(id: CategoryId): Promise<void> {
  try {
    await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Failed to delete category.');
  }
}

export async function getCategories(): Promise<{
  [x: string]: any;
  categories: Categories[];
}> {
  const result = await fetch('/api/categories');
  return result.json();
}

export async function getCategoriesOfAll(): Promise<{ categories: Categories[] }> {
  const result = await fetch('/api/categories');
  return result.json();
}
