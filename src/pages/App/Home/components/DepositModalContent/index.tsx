import React, { useState, useContext } from 'react';
import { Incubator, Text, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from 'styled-components';
import { lighten } from 'polished';

import Button from '~/components/Button';

import { useBalance } from '~/context/Balance';

import { Container } from './styles';

const { TextField } = Incubator;

const DepositModalContent: React.FC = () => {
  const [depositValue, setDepositValue] = useState('');
  const theme = useContext(ThemeContext);

  const { balance, updateBalance } = useBalance();

  const hasValue = Boolean(depositValue && depositValue.length > 0);

  const maskCurrency = (value: string) => {
    let valueCopy = value;

    valueCopy = valueCopy.replace(/\D/g, '');
    valueCopy = valueCopy.replace(/(\d)(\d{2})$/, '$1,$2');
    valueCopy = valueCopy.replace(/(?=(\d{3})+(\D))\B/g, '.');

    return valueCopy;
  };

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
            // TODO: do deposit
            let actualValue = depositValue;

            actualValue = actualValue.replace(/[.]/g, '');
            actualValue = actualValue.replace(/,/g, '.');

            updateBalance(balance + parseFloat(actualValue));
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
