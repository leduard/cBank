import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const {
  Navigator: StackNavigator,
  Screen: StackScreen,
} = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <StackNavigator>
      <StackScreen
        options={{
          headerShown: false,
        }}
        component={AuthRoutes}
        name="Auth"
      />
      <StackScreen
        options={{
          headerShown: false,
        }}
        component={AppRoutes}
        name="App"
      />
    </StackNavigator>
  );
};

export default Routes;
