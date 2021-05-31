import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { useAuth } from '~/context/Auth';

const {
  Navigator: StackNavigator,
  Screen: StackScreen,
} = createStackNavigator();

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <StackNavigator>
      {!user?.email ? (
        <StackScreen
          options={{
            headerShown: false,
          }}
          component={AuthRoutes}
          name="Auth"
        />
      ) : (
        <StackScreen
          options={{
            headerShown: false,
          }}
          component={AppRoutes}
          name="App"
        />
      )}
    </StackNavigator>
  );
};

export default Routes;
