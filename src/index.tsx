import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import Routes from './routes';
import { BalanceProvider } from './context/Balance';
import { AuthProvider } from './context/Auth';

import styles from './styles';

const App: React.FC = () => {
  const [theme, setTheme] = useState({
    ...styles.themes.lightTheme,
    red: styles.colors.red,
    green: styles.colors.green,
    yellow: styles.colors.yellow,
    white: styles.colors.white,
  });

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        <AuthProvider>
          <BalanceProvider>
            <Routes />
          </BalanceProvider>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
