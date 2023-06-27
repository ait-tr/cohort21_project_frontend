import Categories, { CategoriesId } from './types/Categories';
// все запросы на сервер касательно тасков объединены в этом файлике
// в остальной программе, мы будем делать запросы только опосредованно через api
// запрос на создание таска
export async function createCategories(title: string, description: string): Promise<Categories> {
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
// пример запроса на обновление таска
/*
export async function updateCategory(categories: Categories): Promise<void> {
  await fetch(`/api/categories/${categories.id}`, {
    method: 'PUT',
    body: JSON.stringify(categories),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
*/

export async function updateCategory(id: CategoriesId, updatedCategory: Categories): Promise<void> {
    await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedCategory),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// на удаление права только у админа
export async function deleteCategories(id: CategoriesId): Promise<void> {
  try {
    // Make the API call to delete the category
    await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      // Additional headers or authentication tokens if required
    });
    // Deletion successful
  } catch (error) {
    // Handle any error that occurs during the deletion
    throw new Error('Failed to delete category.');
  }
}

// доступ у юзера - таски текущего пользователя
export async function getCategories(): Promise<{
  [x: string]: any; tasks: Categories[]
}> {
  const result = await fetch('/api/categories');
  return result.json();
}

// доступ только у админа - получение с сервера всех задач всех пользователей
export async function getCategoriesOfAll(): Promise<{ tasks: Categories[] }> {
  const result = await fetch('/api/categories');
  return result.json();
}
