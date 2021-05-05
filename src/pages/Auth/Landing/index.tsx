import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { ThemeContext } from 'styled-components/native';
import { lighten } from 'polished';

import Background from '~/components/Background';
import Button from '~/components/Button';

import logoImg from '~/assets/logo_name_white.png';

import { Container } from './styles';

const Auth: React.FC = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  return (
    <Background
      style={{
        justifyContent: 'space-evenly',
        height: '80%',
        marginTop: '20%',
      }}
      colorHeight={435}>
      <AutoHeightImage source={logoImg} width={150} />

      <Container>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color:
                theme.name === 'light'
                  ? lighten(0.25, theme.textColor)
                  : theme.textColor,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Bem-vindo ao cBank
          </Text>
          <Text
            style={{
              fontSize: 16,
              color:
                theme.name === 'light'
                  ? lighten(0.25, theme.textColor)
                  : theme.textColor,
              lineHeight: 20,
            }}>
            Faça transações bancárias de forma fácil e prática
          </Text>
        </View>

        <View>
          <Button
            onPress={() => navigation.navigate('SignIn')}
            width="100%"
            style={{ alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
              Fazer login
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate('SignUp')}
            outline
            width="100%"
            style={{ alignItems: 'center', marginTop: 15 }}>
            <Text
              style={{
                color: theme.secondaryColor,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Cadastrar-se
            </Text>
          </Button>
        </View>
      </Container>
    </Background>
  );
};

export default Auth;
