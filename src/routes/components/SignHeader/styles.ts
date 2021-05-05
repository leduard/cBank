import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: ${getStatusBarHeight()}px;
  height: ${getStatusBarHeight() + 60}px;

  background: ${(props) => props.theme.secondaryColor};
  border-color: ${(props) => `${props.theme.textColor}40`};
`;
