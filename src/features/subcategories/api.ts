import SubCategory from './types/SubCategory';

export async function getSubCategories(): Promise<{
  subCategories: SubCategory[];
}> {
  const result = await fetch('/api/subcategories');
  if (result.status >= 400) {
    const answer = await result.json();
    throw new Error(answer.message);
  }
  return result.json();
}

export async function createSubCategory(
  title: string,
  description: string,
  categoryId: number
): Promise<SubCategory> {
  const res = await fetch('/api/subcategories', {
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
