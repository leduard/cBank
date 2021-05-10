import React from 'react';
import { View, FlatList } from 'react-native';

import Background from '~/components/Background';

import ArrowDown from '~/assets/icons/arrow_down.svg';
import ArrowUp from '~/assets/icons/arrow_up.svg';
import Arrows from '~/assets/icons/arrows.svg';

import formatValue from '~/util/formatValue';

import {
  TransactionContainer,
  TransactionTitle,
  TransactionDate,
  TransactionInvolved,
  TransactionValue,
} from './styles';

const History: React.FC = () => {
  const transactionsTypes = [
    { type: 1, name: 'Retirada' },
    { type: 2, name: 'Deposito' },
    { type: 3, name: 'Transferência' },
  ];

  return (
    <Background inverted colorHeight={0}>
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 10,
        }}
        data={[
          {
            type: 2,
            value: 100000.0,
            time: '2021-04-29 23:46:09',
            cpf_send: null,
          },
          {
            type: 3,
            value: 700.0,
            time: '2021-04-29 23:53:20',
            cpf_send: '1111111111',
          },
          {
            type: 3,
            value: 700.0,
            time: '2021-04-29 23:54:10',
            cpf_send: '1111111111',
          },
          {
            type: 3,
            value: 700.0,
            time: '2021-04-29 23:58:27',
            cpf_send: '1111111111',
          },
          {
            type: 3,
            value: 700.0,
            time: '2021-04-30 01:22:56',
            cpf_send: '1111111111',
          },
        ]}
        keyExtractor={() => String(Math.random())}
        renderItem={({ item }) => {
          return (
            <TransactionContainer>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {item.type === 1 && (
                  <ArrowUp color="white" width={30} height={30} />
                )}
                {item.type === 2 && (
                  <ArrowDown color="white" width={30} height={30} />
                )}
                {item.type === 3 && (
                  <Arrows color="white" width={30} height={30} />
                )}
                <TransactionTitle>
                  {
                    transactionsTypes[
                      transactionsTypes.findIndex((v) => v.type === item.type)
                    ].name
                  }
                </TransactionTitle>
              </View>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: true ? 'space-between' : 'flex-end',
                  }}>
                  <TransactionInvolved>{item.cpf_send}</TransactionInvolved>
                  <TransactionValue>
                    R$ {formatValue(item.value)}
                  </TransactionValue>
                </View>
                <TransactionDate>
                  {new Date(item.time).toLocaleString()}
                </TransactionDate>
              </View>
            </TransactionContainer>
          );
        }}
      />
    </Background>
  );
};

export default History;
