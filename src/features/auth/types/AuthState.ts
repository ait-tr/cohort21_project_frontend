import User from './User';
import UserCards from './UserCards';

export default interface AuthState {
  authChecked: boolean;
  user?: User;
  loginFormError?: string;
  registerFormError?: string;
  userCards?: UserCards;
}
