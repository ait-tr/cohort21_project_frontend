import HelpCard from './types/HelpCard';

export async function createHelpCard(
  categoryId: number,
  subCategoryId: number,
  price: number,
  description: string
): Promise<HelpCard> {
  const res = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify({ categoryId, subCategoryId, price, description }),
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
export async function updateHelpCard(helpCard: HelpCard): Promise<void> {
  await fetch(`/api/cards/${helpCard.id}`, {
    method: 'PUT',
    body: JSON.stringify(helpCard),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getHelpCards(): Promise<{ cards: HelpCard[] }> {
  // TODO исправить на получение только для пользователя (+бэк)
  const result = await fetch('/api/cards');
  return result.json();
}
