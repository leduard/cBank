import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from 'react-native';
import { signIn as signInAPI } from '~/services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  f_name: string;
  l_name: string;
  email: string;
  cpf: string;
  token: string;
}

interface AuthContextData {
  user: AuthState;
  signIn(credentials: SignInCredentials): Promise<boolean>;
  singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AUTH_USER_STORAGE_KEY = '@cbank:auth_user';

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const auth_user = await AsyncStorage.getItem(AUTH_USER_STORAGE_KEY);

      if (auth_user) {
        setData(JSON.parse(auth_user));
      }
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<boolean> => {
      const signInReturn = await signInAPI({
        email,
        password,
      });

      if (!signInReturn?.email) {
        return false;
      }

      await AsyncStorage.setItem(
        AUTH_USER_STORAGE_KEY,
        JSON.stringify(signInReturn),
      );

      setData(signInReturn);

      return true;
    },
    [],
  );

  const singOut = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_USER_STORAGE_KEY);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
