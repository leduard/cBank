import styled from 'styled-components/native';

export const TopTextContainer = styled.View`
  padding: 0 70px 0 10px;
  height: 13%;
  justify-content: space-around;
`;

export const SignInForm = styled.View`
  background: #fff;
  padding: 10px;
  flex: 0.5;
  max-height: 250px;
  border-radius: 20px;

  align-items: center;
  justify-content: space-around;

  width: 85%;
`;

export const ForgotPassText = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.secondaryColor};
`;
