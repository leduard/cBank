import React, { useContext } from 'react';
import { Image } from 'react-native-ui-lib';
import { ThemeContext } from 'styled-components';
import { darken } from 'polished';

import { Alert } from 'react-native';
import Background from '~/components/Background';
import Text from '~/components/Text';

import { useAuth } from '~/context/Auth';

import {
  ProfileContainer,
  ButtonsContainer,
  SettingsButton,
  SettingsButtonText,
  SignOutButton,
  UserCircle,
  UserCircleText,
} from './styles';

const Settings: React.FC = () => {
  const theme = useContext(ThemeContext);
  const { user, singOut } = useAuth();

  return (
    <Background inverted colorHeight={0}>
      <ProfileContainer>
        <UserCircle style={{ elevation: 2 }}>
          <UserCircleText>{`${user?.f_name
            ?.charAt(0)
            ?.toUpperCase()}${user?.l_name
            ?.charAt(0)
            ?.toUpperCase()}`}</UserCircleText>
        </UserCircle>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
          }}>
          {`${user.f_name} ${user.l_name}`}
        </Text>
      </ProfileContainer>
      <ButtonsContainer>
        <SettingsButton rippleColor={darken(0.15, theme.secondaryColor)}>
          <SettingsButtonText>Editar Perfil</SettingsButtonText>
        </SettingsButton>
      </ButtonsContainer>
      <SignOutButton
        onPress={() => {
          Alert.alert(
            'Deseja desconectar?',
            'Deseja fazer logoff da sua conta?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              { text: 'OK', onPress: () => singOut() },
            ],
          );
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
          Desconectar
        </Text>
      </SignOutButton>
    </Background>
  );
};

export default Settings;
