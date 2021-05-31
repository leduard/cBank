import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import Background from '~/components/Background';

import ArrowDown from '~/assets/icons/arrow_down.svg';
import ArrowUp from '~/assets/icons/arrow_up.svg';
import Arrows from '~/assets/icons/arrows.svg';

import { useAuth } from '~/context/Auth';

import formatValue from '~/util/formatValue';

import { getHistory } from '~/services/api';

import {
  TransactionContainer,
  TransactionTitle,
  TransactionDate,
  TransactionInvolved,
  TransactionValue,
} from './styles';

const History: React.FC = () => {
  const [history, setHistory] = useState<
    {
      id: number;
      type: number;
      value: number;
      cpf_send: string;
      send_user: string;
      time: Date;
    }[]
  >([]);
  const { user } = useAuth();

  useEffect(() => {
    async function run() {
      const historyResponse = await getHistory(user.token);

      if (historyResponse?.length) {
        setHistory(historyResponse);
      }
    }

    run();
  }, [user.token]);

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
        data={history.reverse()}
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
                  <TransactionInvolved>
                    {item.cpf_send &&
                      `${item.cpf_send?.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{1,2})/g,
                        '$1.$2.$3-$4',
                      )}`}
                  </TransactionInvolved>
                  <TransactionValue>
                    {item.cpf_send === user.cpf ? '-' : '+'} R${' '}
                    {formatValue(item.value)}
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
