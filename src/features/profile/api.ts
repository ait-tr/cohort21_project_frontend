import User from '../auth/types/User';

export async function getProfile(): Promise<User> {
  const result = await fetch('/api/users/my/profile');
  return result.json();
}

export async function editProfile(editedUser: User): Promise<User> {
  const result = await fetch('/api/users/my/profile', {
    method: 'PUT',
    body: JSON.stringify(editedUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result.json();
}
