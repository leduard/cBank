import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Background from '~/components/Background';
import Text from '~/components/Text';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

import { TopTextContainer, SignInForm, ForgotPassText } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <Background>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
        <TopTextContainer>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>
            Login
          </Text>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            Faça login no aplicativo para acessar sua conta bancária e poder
            fazer transações
          </Text>
        </TopTextContainer>

        <SignInForm>
          <View>
            <TextInput
              value={email}
              onChangeText={(newValue) => setEmail(newValue)}
              placeholder="E-mail"
              hint="example@mail.com"
              returnKeyType="next"
              icon="envelope"
              width={Dimensions.get('screen').width - 100}
            />
            <TextInput
              value={password}
              onChangeText={(newValue) => setPassword(newValue)}
              placeholder="Senha"
              hint=""
              secureTextEntry
              returnKeyType="send"
              icon="lock"
              width={Dimensions.get('screen').width - 100}
            />
          </View>

          <View
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
            }}>
            <Button
              onPress={() => {
                // TODO: do login
                navigation.navigate('App');
              }}
              style={{
                alignSelf: 'stretch',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Entrar
              </Text>
            </Button>
            <TouchableOpacity
              onPress={() => {
                // TODO: do something
              }}
              style={{ padding: 5, marginTop: 5 }}
              activeOpacity={0.35}>
              <ForgotPassText>Esqueceu a senha?</ForgotPassText>
            </TouchableOpacity>
          </View>
        </SignInForm>
      </View>
    </Background>
  );
};

export default SignIn;
