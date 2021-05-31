import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { lighten, darken } from 'polished';

export const ProfileContainer = styled.View`
  width: 90%;
  height: 25%;
  margin: 20px 0;
  align-items: center;
  padding: 0 10px;
  justify-content: space-evenly;
  background: ${(props) => darken(0.03, props.theme.secondaryColor)};
  border-radius: 20px;
`;

export const UserCircle = styled.View`
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 120px;

  border-radius: 100px;
  background: #fff;
`;

export const UserCircleText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.secondaryColor};
  font-size: 52px;
`;

export const ButtonsContainer = styled.View`
  width: 90%;
  flex: 1;
  margin: 0 0 20px 0;
  align-items: center;
  justify-content: flex-start;
`;

export const SettingsButton = styled(RectButton)`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  background: ${(props) => darken(0.03, props.theme.secondaryColor)};
  border-radius: 10px;
`;

export const SettingsButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
`;

export const SignOutButton = styled(RectButton).attrs({
  rippleColor: lighten(0.25, '#DA2F3A'),
})`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: ${(props) => props.theme.red};
`;
