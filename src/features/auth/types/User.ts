export default interface User {
  id: number;
  username: string;
  role?: string;
  email?: string;
  phone?: string;
  isHelper?: boolean;
}
