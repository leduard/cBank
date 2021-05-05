import React, { useContext } from 'react';
import { View, ViewProps } from 'react-native';
import { Button as ButtonBase } from 'react-native-ui-lib';
import { ThemeContext } from 'styled-components/native';

interface ButtonProps extends ViewProps {
  width?: number | string;
  outline?: boolean;
  disabled?: boolean;
  onPress(): void;
}

const Button: React.FC<ButtonProps> = ({
  width = '80%',
  outline = false,
  disabled = false,
  children,
  onPress,
  ...props
}) => {
  const theme = useContext(ThemeContext);

  return (
    <View {...props}>
      <ButtonBase
        disabled={disabled}
        onPress={onPress}
        backgroundColor={outline ? 'transparent' : theme.secondaryColor}
        borderRadius={5}
        style={{
          width,
          borderWidth: outline ? 2 : undefined,
          borderColor: outline ? theme.secondaryColor : undefined,
        }}>
        {children}
      </ButtonBase>
    </View>
  );
};

export default Button;
