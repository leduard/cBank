import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { lighten } from 'polished';

import BaseText from '~/components/Text';

export const UserCircle = styled.View`
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 120px;

  border-radius: 100px;
  background: #fff;
`;

export const MoreIconContainer = styled(RectButton).attrs({
  rippleColor: '#d0d0d0',
})`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -5px;
  bottom: -5px;
  height: 40px;
  width: 40px;
  background: ${(props) => lighten(0.07, props.theme.background)};
  border-radius: 40px;
`;

export const UserCircleText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.secondaryColor};
  font-size: 52px;
`;

export const AccountValueText = styled(BaseText)`
  font-weight: bold;
  color: #fff;
  font-size: 38px;
`;

export const Button = styled(RectButton).attrs({
  rippleColor: '#ffffff30',
})`
  align-items: stretch;
  justify-content: space-between;
  width: 115px;
  height: 115px;
  border-radius: 15px;
  background: ${(props) =>
    props.enabled
      ? props.theme.primaryColor
      : lighten(0.02, props.theme.primaryColor)};
`;

export const ButtonText = styled(BaseText)`
  font-weight: bold;
  text-align: right;
  color: #fff;
  font-size: 16px;
  margin: 0 7px 2px 0;
`;
