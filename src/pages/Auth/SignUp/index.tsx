import React, { useCallback, useState, useContext } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Toast } from 'react-native-ui-lib';
import { ThemeContext } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Background from '~/components/Background';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

import { signUp } from '~/services/api';

import { TopTextContainer, SignUpForm } from './styles';

const App: React.FC = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async () => {
    setLoading(true);
    setSignUpError(false);

    if (password !== confirmPassword) {
      setSignUpError(true);
      setToastVisible(true);

      return;
    }

    const signUpReturn = await signUp({
      fname: nome,
      lname: sobrenome,
      cpf: cpf.replace(/[^\d]/g, ''),
      email,
      password,
    });

    if (!signUpReturn?.email) {
      setSignUpError(true);
    }

    setToastVisible(true);
    setLoading(false);

    if (signUpReturn?.email) {
      setNome('');
      setSobrenome('');
      setCpf('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 1500);
    }
  }, [confirmPassword, cpf, email, navigation, nome, password, sobrenome]);

  const renderSuccessToastContent = () => {
    return (
      <View
        style={{
          backgroundColor: theme.green,
          paddingVertical: 25,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: theme.textColor,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Conta criada com sucesso
        </Text>
        <Text style={{ color: theme.textColor, fontSize: 16 }}>
          Você será redirecionado para a tela de login em instantes
        </Text>
      </View>
    );
  };

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
          Não foi possível criar a conta
        </Text>
        <Text style={{ color: theme.white, fontSize: 16 }}>
          Verifique as informações digitadas ou tente novamente mais tarde
        </Text>
      </View>
    );
  };

  return (
    <Background colorHeight={500}>
      <Toast
        visible={toastVisible}
        position="bottom"
        allowDismiss
        autoDismiss={2000}
        animated
        onDismiss={() => {
          setToastVisible(false);
        }}>
        {signUpError ? renderFailToastContent() : renderSuccessToastContent()}
      </Toast>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
        <TopTextContainer>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>
            Cadastro
          </Text>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            Faça cadastro no aplicativo para ganhar acesso a uma conta bancária
            e poder fazer transações
          </Text>
        </TopTextContainer>
        <SignUpForm>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                value={nome}
                onChangeText={(newValue) => setNome(newValue)}
                placeholder="Nome"
                hint="João"
                returnKeyType="next"
                icon="user-circle"
                iconWidth="20%"
                width={Dimensions.get('screen').width / 2.75}
              />
              <TextInput
                value={sobrenome}
                onChangeText={(newValue) => setSobrenome(newValue)}
                placeholder="Sobrenome"
                hint="Santos"
                returnKeyType="next"
                icon=""
                iconWidth="20%"
                width={Dimensions.get('screen').width / 2.75}
              />
            </View>
            <TextInput
              value={cpf}
              onChangeText={(newValue) => {
                let newValueMasked = newValue;
                const numberOnly = newValueMasked.replace(/[^\d]/g, '');

                if (numberOnly.length <= 6) {
                  newValueMasked = numberOnly.replace(
                    /(\d{3})(\d{1,3})/g,
                    '$1.$2',
                  );
                } else if (numberOnly.length <= 9) {
                  newValueMasked = numberOnly.replace(
                    /(\d{3})(\d{3})(\d{1,3})/g,
                    '$1.$2.$3',
                  );
                } else {
                  newValueMasked = numberOnly.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{1,2})/g,
                    '$1.$2.$3-$4',
                  );
                }

                setCpf(newValueMasked);
              }}
              maxLength={14}
              placeholder="CPF"
              hint="000.000.000-00"
              returnKeyType="next"
              keyboardType="numeric"
              icon="id-card-o"
              iconWidth="10%"
              width={Dimensions.get('screen').width - 100}
            />
            <TextInput
              value={email}
              onChangeText={(newValue) => setEmail(newValue)}
              placeholder="E-mail"
              hint="example@mail.com"
              returnKeyType="next"
              keyboardType="email-address"
              icon="envelope"
              iconWidth="10%"
              width={Dimensions.get('screen').width - 100}
            />
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                value={password}
                onChangeText={(newValue) => setPassword(newValue)}
                placeholder="Senha"
                hint=""
                returnKeyType="next"
                secureTextEntry
                icon="lock"
                iconWidth="20%"
                width={Dimensions.get('screen').width / 2.75}
              />
              <TextInput
                value={confirmPassword}
                onChangeText={(newValue) => setConfirmPassword(newValue)}
                placeholder="Repita a senha"
                hint=""
                returnKeyType="next"
                secureTextEntry
                icon=""
                iconWidth="20%"
                width={Dimensions.get('screen').width / 2.75}
              />
            </View>
          </View>

          <Button
            disabled={loading}
            onPress={() => {
              handleSignUp();
            }}
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
            }}>
            {!loading ? (
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Cadastrar
              </Text>
            ) : (
              <ActivityIndicator size={22} color="#FFF" />
            )}
          </Button>
        </SignUpForm>
      </ScrollView>
    </Background>
  );
};

export default App;
