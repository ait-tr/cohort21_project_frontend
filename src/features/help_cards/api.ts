// все запросы на сервер касательно тасков объединены в этом файлике
// в остальной программе, мы будем делать запросы только опосредованно через api

import HelpCard from './types/HelpCard';

// запрос на создание таска
export async function createHelpCard(
  name: string,
  description: string
): Promise<HelpCard> {
  const res = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify({ name, description }),
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
export async function updateHelpCard(helpCard: HelpCard): Promise<void> {
  await fetch(`/api/cards/${helpCard.id}`, {
    method: 'PUT',
    body: JSON.stringify(helpCard),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// доступ у юзера - таски текущего пользователя
export async function getHelpCards(): Promise<{ helpCards: HelpCard[] }> {
  const result = await fetch('/api/users/my/cards');
  return result.json();
}
