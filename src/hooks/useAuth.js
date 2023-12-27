import { useSelector } from 'react-redux';

export function useAuth() {
  const authState = useSelector(state => state.auth); // Access the auth state

  const isLoggedIn = authState.token !== null;

  return isLoggedIn;
}
  