import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components';

import Home from '~/pages/App/Home';
import Settings from '~/pages/App/Settings';
import History from '~/pages/App/History';

const {
  Navigator: StackNavigator,
  Screen: StackScreen,
} = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <StackNavigator>
      <StackScreen
        options={{
          headerShown: false,
        }}
        component={Home}
        name="Home"
      />
      <StackScreen
        options={{
          headerStyle: {
            backgroundColor: theme.secondaryColor,
            shadowColor: 'black',
          },
          headerTintColor: '#ffffff',
          headerTitle: 'Configurações',
          headerTitleAlign: 'center',
        }}
        component={Settings}
        name="Settings"
      />
      <StackScreen
        options={{
          headerStyle: {
            backgroundColor: theme.secondaryColor,
            shadowColor: 'black',
          },
          headerTintColor: '#ffffff',
          headerTitle: 'Histórico',
          headerTitleAlign: 'center',
        }}
        component={History}
        name="History"
      />
    </StackNavigator>
  );
};

export default AuthRoutes;
