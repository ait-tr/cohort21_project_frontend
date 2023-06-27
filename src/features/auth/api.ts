import HelpCard from '../help_cards/types/HelpCard';
import Credentials from './types/Credentials';
import RegisterData from './types/RegisterData';
import User from './types/User';

export async function getProfile(): Promise<{
  id: number;
  username: string;
  role?: string;
  email?: string;
  phone?: string;
  isHelper?: boolean;
  cards?: HelpCard[];
}> {
  const res = await fetch('/api/users/my/profile');
  if (res.status >= 400) {
    const answer = await res.json();
    throw new Error(answer.message);
  }
  return res.json();
}

export async function login(credentials: Credentials): Promise<User> {
  const res = await fetch('/login', {
    method: 'POST',
    body: `username=${credentials.username}&password=${credentials.password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // реджектим промис если вернулся ошибочный статус
  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }
  return res.json();
}

export async function register(
  data: RegisterData
): Promise<{ id: number; username: string }> {
  const res = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch('/logout', {
    method: 'PUT',
  });
}

export async function editProfile(editedUser: User): Promise<User> {
  const res = await fetch('/api/users/my/profile', {
    method: 'PUT',
    body: JSON.stringify(editedUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }
  return res.json();
}
