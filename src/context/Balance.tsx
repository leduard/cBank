import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from './Auth';

import { getUserBalance } from '~/services/api';

interface BalanceContextData {
  balance: number;
  updateBalance(newBalance: number): void;
  getBalance(): Promise<void>;
}

const BalanceContext = createContext<BalanceContextData>(
  {} as BalanceContextData,
);

const USER_BALANCE_STORAGE_KEY = '@cbank:user_balance';

export const BalanceProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState(0);

  const { user } = useAuth();

  const getBalance = useCallback(async () => {
    const storageBalance = await AsyncStorage.getItem(USER_BALANCE_STORAGE_KEY);

    if (storageBalance) {
      setBalance(parseFloat(storageBalance));
    } else setBalance(0);

    const balanceResponse = await getUserBalance(user.token);

    if (balanceResponse?.balance.toString()) {
      setBalance(balanceResponse?.balance);

      await AsyncStorage.setItem(
        USER_BALANCE_STORAGE_KEY,
        String(balanceResponse?.balance),
      );
    }
  }, [user.token]);

  useEffect(() => {
    setBalance(parseFloat(balance.toFixed(2)));
  }, [balance]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const updateBalance = useCallback(async (newBalance) => {
    setBalance(newBalance);

    await AsyncStorage.setItem(USER_BALANCE_STORAGE_KEY, String(newBalance));
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, updateBalance, getBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export function useBalance(): BalanceContextData {
  const context = useContext(BalanceContext);

  if (!context) {
    throw Error('useBalance must be used within an BalanceProvider');
  }

  return context;
}

export default BalanceContext;
