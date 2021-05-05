/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect } from 'react';
import { Incubator, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from 'styled-components';
import { lighten } from 'polished';

import Button from '~/components/Button';

import { useBalance } from '~/context/Balance';

import { Container } from './styles';

const { TextField } = Incubator;

const WithdrawModalContent: React.FC = () => {
  const [withdrawValue, setWithdrawValue] = useState('');
  const [actualWithdrawValue, setActualWithdrawValue] = useState('');
  const theme = useContext(ThemeContext);

  const { balance, updateBalance } = useBalance();

  const hasValue = Boolean(withdrawValue && withdrawValue.length > 0);

  const maskCurrency = (value: string) => {
    let valueCopy = value;

    valueCopy = valueCopy.replace(/\D/g, '');
    valueCopy = valueCopy.replace(/(\d)(\d{2})$/, '$1,$2');
    valueCopy = valueCopy.replace(/(?=(\d{3})+(\D))\B/g, '.');

    return valueCopy;
  };

  useEffect(() => {
    let actualValue = withdrawValue;

    actualValue = actualValue.replace(/[.]/g, '');
    actualValue = actualValue.replace(/,/g, '.');

    setActualWithdrawValue(actualValue);
  }, [withdrawValue]);

  return (
    <Container>
      <Text
        text30
        center
        style={{
          color: theme.textColor,
          marginBottom: 40,
          fontWeight: 'bold',
        }}>
        Digite um valor para retirar
      </Text>

      <TextField
        value={withdrawValue}
        onChangeText={(newValue) => {
          setWithdrawValue(maskCurrency(newValue));
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
            parseFloat(actualWithdrawValue) > balance
              ? theme.red
              : theme.textColor,
        }}
        fieldStyle={{
          minWidth: 260,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderBottomWidth: 2,
          borderBottomColor: hasValue
            ? parseFloat(actualWithdrawValue) > balance
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
              !hasValue
                ? '#a8a8a8'
                : parseFloat(actualWithdrawValue) > balance
                ? theme.red
                : theme.textColor
            }
            size={35}
          />
        }
      />

      <View style={{ width: '70%', marginTop: 50 }}>
        <Button
          disabled={!hasValue || parseFloat(actualWithdrawValue) > balance}
          onPress={() => {
            // TODO: do deposit
            let actualValue = withdrawValue;

            actualValue = actualValue.replace(/[.]/g, '');
            actualValue = actualValue.replace(/,/g, '.');

            updateBalance(balance - parseFloat(actualValue));
            setWithdrawValue('');
          }}
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
          }}>
          <Text text60 white>
            Retirar
          </Text>
        </Button>
      </View>
    </Container>
  );
};

export default WithdrawModalContent;
