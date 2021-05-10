import React, { useState, useContext, useRef } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from 'styled-components';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';

import Background from '~/components/Background';

import PiggyDepositIcon from '~/assets/icons/piggy_deposit.svg';
import PiggyWithdrawIcon from '~/assets/icons/piggy_withdraw.svg';
import PiggyTransferIcon from '~/assets/icons/piggy_transfer.svg';
import PayIcon from '~/assets/icons/pay_icon.svg';

import DepositModalContent from './components/DepositModalContent';
import PayModalContent from './components/PayModalContent';
import TransferModalContent from './components/TransferModalContent';
import WithdrawModalContent from './components/WithdrawModalContent';

import { useBalance } from '~/context/Balance';

import formatValue from '~/util/formatValue';

import {
  UserCircle,
  MoreIconContainer,
  UserCircleText,
  AccountValueText,
  Button,
  ButtonText,
} from './styles';

const Home: React.FC = () => {
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const modalizeRef = useRef<Modalize>(null);

  const { balance } = useBalance();

  return (
    <Background inverted colorHeight={0}>
      <UserCircle style={{ elevation: 2 }}>
        <MoreIconContainer
          onPress={() => {
            navigation.navigate('Settings');
          }}
          style={{
            elevation: 1,
          }}>
          <Icon name="more-horiz" size={30} color={theme.secondaryColor} />
        </MoreIconContainer>
        <UserCircleText>LE</UserCircleText>
      </UserCircle>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: '60%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '70%',
          }}>
          <AccountValueText>R$ {formatValue(balance)}</AccountValueText>
          <RectButton
            onPress={() => {
              navigation.navigate('History');
            }}
            rippleColor="#d0d0d0"
            style={{ borderRadius: 100 }}>
            <Icon name="history" size={40} color="#fff" style={{ left: -2 }} />
          </RectButton>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-around',
            justifyContent: 'space-around',
            height: 275,
            width: 275,
          }}>
          <Button
            enabled
            onPress={() => {
              setDepositModalOpen(true);
              modalizeRef.current?.open();
            }}
            style={{ elevation: 2 }}>
            <PiggyDepositIcon
              color="white"
              width={65}
              height={65}
              style={{ marginLeft: 15, marginTop: 10 }}
            />
            <ButtonText>Depositar</ButtonText>
          </Button>
          <Button
            enabled
            onPress={() => {
              setWithdrawModalOpen(true);
              modalizeRef.current?.open();
            }}
            style={{ elevation: 2 }}>
            <PiggyWithdrawIcon
              color="white"
              width={65}
              height={65}
              style={{ marginLeft: 15, marginTop: 10 }}
            />
            <ButtonText>Retirar</ButtonText>
          </Button>
          <Button
            enabled
            onPress={() => {
              setTransferModalOpen(true);
              modalizeRef.current?.open();
            }}
            style={{ elevation: 2 }}>
            <PiggyTransferIcon
              color="white"
              width={65}
              height={65}
              style={{ marginLeft: 15, marginTop: 10 }}
            />
            <ButtonText>Transferir</ButtonText>
          </Button>
          <Button
            enabled={false}
            onPress={() => {
              setPayModalOpen(true);
              modalizeRef.current?.open();
            }}
            style={{ elevation: 2 }}>
            <PayIcon
              color="white"
              width={65}
              height={65}
              style={{ marginLeft: 15, marginTop: 10 }}
            />
            <ButtonText>Pagar</ButtonText>
          </Button>
        </View>
      </View>
      <Modalize
        // snapPoint={500}
        adjustToContentHeight
        onClose={() => {
          setDepositModalOpen(false);
          setWithdrawModalOpen(false);
          setTransferModalOpen(false);
          setPayModalOpen(false);
        }}
        modalStyle={{
          width: '97%',
          alignSelf: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        rootStyle={{ elevation: 3 }}
        childrenStyle={{
          paddingVertical: 25,
        }}
        ref={modalizeRef}>
        {depositModalOpen && <DepositModalContent />}
        {withdrawModalOpen && <WithdrawModalContent />}
        {transferModalOpen && <TransferModalContent />}
        {payModalOpen && <PayModalContent />}
      </Modalize>
    </Background>
  );
};

export default Home;
