import HelpCard, { HelpCardId } from './types/HelpCard';

export async function createHelpCard(
  title: string,
  categoryId: number,
  subCategoryId: number,
  price: number,
  description: string,
  fullDescription: string
): Promise<HelpCard> {
  const res = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify({
      title,
      categoryId,
      subCategoryId,
      price,
      description,
      fullDescription,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status >= 400){
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

export async function deleteHelpCard(id: HelpCardId): Promise<void> {
  await fetch(`/api/cards/${id}`, {
    method: 'DELETE',
  });
}

export async function getHelpCard(id: number): Promise<HelpCard> {
  const res = await fetch(`/api/cards/${id}`);
  if (res.status >= 400) {
    const answer = await res.json();
    throw new Error(answer.message);
  }
  return res.json();
}
