import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import logoImg from '~/assets/logo_white.png';

import { HeaderContainer } from './styles';

const SignHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <HeaderContainer
      style={{
        elevation: 5,
        shadowOpacity: 1,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          marginLeft: 10,
          top: getStatusBarHeight() + 5,
        }}>
        <Icon color="#fff" name="chevron-left" size={50} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <AutoHeightImage source={logoImg} width={35} />
      </View>
    </HeaderContainer>
  );
};

export default SignHeader;
