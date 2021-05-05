import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from '~/pages/Auth/Landing';
import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

import SignHeader from './components/SignHeader';

const {
  Navigator: StackNavigator,
  Screen: StackScreen,
} = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <StackNavigator>
      <StackScreen
        options={{
          headerShown: false,
        }}
        component={Auth}
        name="Auth"
      />
      <StackScreen
        options={{
          headerTransparent: true,
          header: () => <SignHeader />,
        }}
        component={SignIn}
        name="SignIn"
      />
      <StackScreen
        options={{
          headerTransparent: true,
          header: () => <SignHeader />,
        }}
        component={SignUp}
        name="SignUp"
      />
    </StackNavigator>
  );
};

export default AuthRoutes;
