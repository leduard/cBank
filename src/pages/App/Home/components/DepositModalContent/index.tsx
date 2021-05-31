import React, { useState, useContext, useCallback } from 'react';
import { Incubator, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from 'styled-components';
import { lighten } from 'polished';
import { Toast } from 'react-native-ui-lib';

import { Alert } from 'react-native';
import Button from '~/components/Button';

import { useBalance } from '~/context/Balance';
import { useAuth } from '~/context/Auth';

import { depositValue as depositValueAPI } from '~/services/api';

import { Container } from './styles';

const { TextField } = Incubator;

const DepositModalContent: React.FC = () => {
  const [depositValue, setDepositValue] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [depositError, setDepositError] = useState(false);

  const theme = useContext(ThemeContext);
  const { updateBalance } = useBalance();
  const { user } = useAuth();

  const hasValue = Boolean(depositValue && depositValue.length > 0);

  const maskCurrency = (value: string) => {
    let valueCopy = value;

    valueCopy = valueCopy.replace(/\D/g, '');
    valueCopy = valueCopy.replace(/(\d)(\d{2})$/, '$1,$2');
    valueCopy = valueCopy.replace(/(?=(\d{3})+(\D))\B/g, '.');

    return valueCopy;
  };

  const depositMoney = useCallback(async () => {
    let actualValue = depositValue;

    actualValue = actualValue.replace(/[.]/g, '');
    actualValue = actualValue.replace(/,/g, '.');

    setDepositError(false);
    setToastVisible(false);

    const depositResponse = await depositValueAPI(
      user.token,
      parseFloat(actualValue),
    );

    if (depositResponse?.balance.toString()) {
      updateBalance(depositResponse.balance);
      setDepositError(false);
      setToastVisible(true);
    } else {
      setDepositError(true);
      setToastVisible(true);
    }
  }, [depositValue, updateBalance, user.token]);

  const renderFailToastContent = () => {
    return (
      <View
        style={{
          backgroundColor: theme.red,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: theme.white,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Não foi possível fazer o depósito
        </Text>
        <Text style={{ color: theme.white, fontSize: 16 }}>
          Não foi possível fazer o depósito, verifique o valor digitado ou tente
          novamente mais tarde
        </Text>
      </View>
    );
  };

  const renderSuccessToastContent = () => {
    return (
      <View
        style={{
          backgroundColor: theme.green,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: theme.textColor,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Depósito concluído com sucesso!
        </Text>
        <Text style={{ color: theme.textColor, fontSize: 16 }}>
          Seu depósito fei concluído com sucesso e o dinheiro já está pronto
          para ser usado
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <Toast
        visible={toastVisible}
        position="bottom"
        allowDismiss
        autoDismiss={2000}
        animated
        onDismiss={() => {
          setToastVisible(false);
        }}>
        {depositError ? renderFailToastContent() : renderSuccessToastContent()}
      </Toast>
      <Text
        text30
        center
        style={{
          color: theme.textColor,
          marginBottom: 40,
          fontWeight: 'bold',
        }}>
        Digite um valor para depositar
      </Text>

      <TextField
        value={depositValue}
        onChangeText={(newValue) => {
          setDepositValue(maskCurrency(newValue));
        }}
        maxLength={12}
        placeholder="00,00"
        containerStyle={{ padding: 5 }}
        style={{
          height: 45,
          fontSize: 32,
          textAlign: 'center',
          fontWeight: 'bold',
          color: theme.textColor,
        }}
        fieldStyle={{
          minWidth: 260,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderBottomWidth: 2,
          borderBottomColor: hasValue
            ? theme.secondaryColor
            : lighten(0.3, theme.secondaryColor),
        }}
        placeholderTextColor="#a8a8a8"
        keyboardType="numeric"
        leadingAccessory={
          <Icon
            name="dollar"
            color={!hasValue ? '#a8a8a8' : theme.textColor}
            size={35}
          />
        }
      />

      <View style={{ width: '70%', marginTop: 50 }}>
        <Button
          disabled={!hasValue}
          onPress={() => {
            depositMoney();
            setDepositValue('');
          }}
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
          }}>
          <Text text60 white>
            Depositar
          </Text>
        </Button>
      </View>
    </Container>
  );
};

export default DepositModalContent;
