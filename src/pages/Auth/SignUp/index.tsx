import React, { useState } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';

import Background from '~/components/Background';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

import { TopTextContainer, SignUpForm } from './styles';

const App: React.FC = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Background colorHeight={500}>
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
            onPress={() => {
              // TODO: do something
            }}
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Cadastrar
            </Text>
          </Button>
        </SignUpForm>
      </ScrollView>
    </Background>
  );
};

export default App;
