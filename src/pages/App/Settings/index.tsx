import React, { useContext } from 'react';
import { Image } from 'react-native-ui-lib';
import { ThemeContext } from 'styled-components';
import { darken } from 'polished';

import Background from '~/components/Background';
import Text from '~/components/Text';

import {
  ProfileContainer,
  ButtonsContainer,
  SettingsButton,
  SettingsButtonText,
  SignOutButton,
} from './styles';

const Settings: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Background inverted colorHeight={0}>
      <ProfileContainer>
        <Image
          source={{
            uri:
              'https://avatars.githubusercontent.com/u/43726280?s=400&u=1c3c8cdc743382691324c8b35140380c5d95fca6&v=4',
          }}
          style={{ width: 80, height: 80, borderRadius: 80 }}
        />
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
          }}>
          Luiz Eduardo Oliveira de Araújo
        </Text>
      </ProfileContainer>
      <ButtonsContainer>
        <SettingsButton rippleColor={darken(0.15, theme.secondaryColor)}>
          <SettingsButtonText>Editar Perfil</SettingsButtonText>
        </SettingsButton>
      </ButtonsContainer>
      <SignOutButton>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
          Desconectar
        </Text>
      </SignOutButton>
    </Background>
  );
};

export default Settings;
