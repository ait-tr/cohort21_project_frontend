export default interface User {
  id: number;
  username: string;
  avatar?: string;
  role?: string;
  email?: string;
  phone?: string;
  isHelper?: boolean;
}
