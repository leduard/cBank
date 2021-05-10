import styled from 'styled-components/native';
import { darken } from 'polished';

import Text from '~/components/Text';

export const TransactionContainer = styled.View`
  width: 95%;
  padding: 10px 20px;
  border-radius: 10px;
  background: ${(props) => darken(0.03, props.theme.secondaryColor)};
  border-color: #fff;
  border-width: 1px;
  margin-bottom: 10px;
  align-self: center;
`;

export const TransactionTitle = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
  margin-left: 15px;
`;

export const TransactionDate = styled(Text)`
  color: #fff;
  font-size: 16px;
`;

export const TransactionValue = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const TransactionInvolved = styled(Text)`
  color: #fff;
  max-width: 80%;
  font-size: 16px;
`;
