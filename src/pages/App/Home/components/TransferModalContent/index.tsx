/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Incubator, Text, Toast, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from 'styled-components';
import { lighten } from 'polished';

import Button from '~/components/Button';

import { useBalance } from '~/context/Balance';
import { useAuth } from '~/context/Auth';

import { transferValue as transferValueAPI } from '~/services/api';

import { Container } from './styles';

const { TextField } = Incubator;

const TransferModalContent: React.FC = () => {
  const [transferValue, setTransferValue] = useState('');
  const [actualTransferValue, setActualTransferValue] = useState('');
  const [targetCpf, setTargetCpf] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [transferError, setTransferError] = useState(false);

  const { balance, updateBalance } = useBalance();
  const { user } = useAuth();

  const theme = useContext(ThemeContext);

  const transferHasValue = Boolean(transferValue && transferValue.length > 0);
  const cpfHasValue = Boolean(targetCpf && targetCpf.length > 0);

  const maskCurrency = (value: string) => {
    let valueCopy = value;

    valueCopy = valueCopy.replace(/\D/g, '');
    valueCopy = valueCopy.replace(/(\d)(\d{2})$/, '$1,$2');
    valueCopy = valueCopy.replace(/(?=(\d{3})+(\D))\B/g, '.');

    return valueCopy;
  };

  const transferMoney = useCallback(async () => {
    let actualValue = transferValue;

    actualValue = actualValue.replace(/[.]/g, '');
    actualValue = actualValue.replace(/,/g, '.');

    setTransferError(false);
    setToastVisible(false);

    const transferResponse = await transferValueAPI(
      user.token,
      parseFloat(actualValue),
      targetCpf.replace(/[^\d]/g, ''),
    );

    if (transferResponse?.balance_send.toString()) {
      updateBalance(transferResponse.balance_send);
      setTransferError(false);
      setToastVisible(true);
      setTransferValue('');
      setTargetCpf('');
    } else {
      setTransferError(true);
      setToastVisible(true);
    }
  }, [transferValue, user.token, targetCpf, updateBalance]);

  useEffect(() => {
    let actualValue = transferValue;

    actualValue = actualValue.replace(/[.]/g, '');
    actualValue = actualValue.replace(/,/g, '.');

    setActualTransferValue(actualValue);
  }, [transferValue]);

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
          Não foi possível fazer a transferência para o CPF digitado
        </Text>
        <Text style={{ color: theme.white, fontSize: 16 }}>
          Não foi possível fazer a transferência, verifique o CPF digitado ou
          tente novamente mais tarde
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
          Valor retirado com sucesso!
        </Text>
        <Text style={{ color: theme.textColor, fontSize: 16 }}>
          Sua retirada foi feita com sucesso, aproveite!
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Toast
        visible={toastVisible}
        position="bottom"
        allowDismiss
        autoDismiss={2000}
        animated
        onDismiss={() => {
          setToastVisible(false);
        }}>
        {transferError ? renderFailToastContent() : renderSuccessToastContent()}
      </Toast>
      <Container>
        <Text
          text40
          center
          style={{
            color: theme.textColor,
            marginBottom: 40,
            fontWeight: 'bold',
            paddingHorizontal: 20,
          }}>
          Digite um valor para transferir
        </Text>

        <TextField
          value={transferValue}
          onChangeText={(newValue) => {
            setTransferValue(maskCurrency(newValue));
          }}
          maxLength={12}
          placeholder="00,00"
          containerStyle={{ padding: 5 }}
          style={{
            height: 45,
            fontSize: 32,
            textAlign: 'center',
            fontWeight: 'bold',
            color:
              parseFloat(actualTransferValue) > balance
                ? theme.red
                : theme.textColor,
          }}
          fieldStyle={{
            minWidth: 260,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderBottomWidth: 2,
            borderBottomColor: transferHasValue
              ? parseFloat(actualTransferValue) > balance
                ? theme.red
                : theme.secondaryColor
              : lighten(0.3, theme.secondaryColor),
          }}
          placeholderTextColor="#a8a8a8"
          keyboardType="numeric"
          leadingAccessory={
            <Icon
              name="dollar"
              color={
                !transferHasValue
                  ? '#a8a8a8'
                  : parseFloat(actualTransferValue) > balance
                  ? theme.red
                  : theme.textColor
              }
              size={35}
            />
          }
        />

        <Text
          text40
          center
          style={{
            color: theme.textColor,
            marginVertical: 40,
            fontWeight: 'bold',
            paddingHorizontal: 20,
          }}>
          Digite o CPF do destinatário
        </Text>

        <TextField
          value={targetCpf}
          onChangeText={(newValue) => {
            let newValueMasked = newValue;
            const numberOnly = newValueMasked.replace(/[^\d]/g, '');

            if (numberOnly.length <= 6) {
              newValueMasked = numberOnly.replace(/(\d{3})(\d{1,3})/g, '$1.$2');
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

            setTargetCpf(newValueMasked);
          }}
          maxLength={14}
          placeholder="CPF"
          hint="000.000.000-00"
          returnKeyType="next"
          keyboardType="numeric"
          style={{
            height: 45,
            fontSize: 32,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          fieldStyle={{
            minWidth: 300,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderBottomWidth: 2,
            borderBottomColor: cpfHasValue
              ? theme.secondaryColor
              : lighten(0.3, theme.secondaryColor),
          }}
          leadingAccessory={
            <Icon
              name="user"
              color={!cpfHasValue ? '#a8a8a8' : theme.textColor}
              size={30}
            />
          }
        />

        <View style={{ width: '70%', marginTop: 50 }}>
          <Button
            disabled={
              !transferHasValue ||
              parseFloat(actualTransferValue) > balance ||
              !cpfHasValue ||
              targetCpf.length < 14 ||
              targetCpf.replace(/[^\d]/g, '') === user.cpf
            }
            onPress={() => {
              transferMoney();
            }}
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
            }}>
            <Text text60 white>
              Transferir
            </Text>
          </Button>
        </View>
      </Container>
    </View>
  );
};

export default TransferModalContent;
