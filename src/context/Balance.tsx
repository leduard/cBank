import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

interface BalanceContextData {
  balance: number;
  updateBalance(newBalance: number): void;
}

const BalanceContext = createContext<BalanceContextData>(
  {} as BalanceContextData,
);

export const BalanceProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState(124.42);

  useEffect(() => {
    setBalance(parseFloat(balance.toFixed(2)));
  }, [balance]);

  const updateBalance = useCallback(async (newBalance) => {
    setBalance(newBalance);
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
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
