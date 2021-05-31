import React, { useCallback, useContext, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { Toast } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from 'styled-components';

import Background from '~/components/Background';
import Text from '~/components/Text';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

import { useAuth } from '~/context/Auth';

import { TopTextContainer, SignInForm, ForgotPassText } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const theme = useContext(ThemeContext);
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    setSignUpError(false);

    const signInReturn = await signIn({
      email,
      password,
    });

    if (!signInReturn) {
      setSignUpError(true);
    }

    setToastVisible(true);
    setLoading(false);
  }, [email, password, signIn]);

  const renderFailToastContent = () => {
    return (
      <View
        style={{
          backgroundColor: theme.red,
          paddingVertical: 25,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: theme.white,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Não foi possível fazer login
        </Text>
        <Text style={{ color: theme.white, fontSize: 16 }}>
          Verifique as informações digitadas ou tente novamente mais tarde
        </Text>
      </View>
    );
  };

  return (
    <Background>
      <Toast
        visible={toastVisible}
        position="bottom"
        allowDismiss
        autoDismiss={2000}
        animated
        onDismiss={() => {
          setToastVisible(false);
        }}>
        {signUpError && renderFailToastContent()}
      </Toast>
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
              keyboardType="email-address"
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
              disabled={loading}
              onPress={() => {
                handleSignIn();
              }}
              style={{
                alignSelf: 'stretch',
                alignItems: 'center',
              }}>
              {!loading ? (
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  Entrar
                </Text>
              ) : (
                <ActivityIndicator size={22} color="#FFF" />
              )}
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
