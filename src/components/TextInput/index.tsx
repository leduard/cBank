import React, { useContext } from 'react';
import { ReturnKeyTypeOptions, KeyboardTypeOptions, View } from 'react-native';
import { Incubator } from 'react-native-ui-lib';
import { ThemeContext } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { TextField: TextFieldBase } = Incubator;

interface TextFieldProps {
  width?: number;
  placeholder: string;
  hint: string;
  secureTextEntry?: boolean;
  returnKeyType: ReturnKeyTypeOptions;
  keyboardType?: KeyboardTypeOptions;
  icon?: string;
  iconWidth?: string;
  value: string;
  maxLength?: number;
  onChangeText(newValue: string): void;
}

const TextField: React.FC<TextFieldProps> = ({
  width = undefined,
  hint,
  placeholder,
  secureTextEntry = false,
  returnKeyType,
  keyboardType = 'default',
  icon = undefined,
  iconWidth = '10%',
  value,
  maxLength = undefined,
  onChangeText,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <TextFieldBase
      value={value}
      onChangeText={(e) => onChangeText(e)}
      maxLength={maxLength}
      placeholder={placeholder}
      hint={hint}
      containerStyle={{ padding: 5 }}
      leadingAccessory={
        icon ? (
          <View
            style={{
              alignItems: 'center',
              width: iconWidth,
              marginRight: 10,
            }}>
            <Icon name={icon} color="#a8a8a8" size={20} />
          </View>
        ) : (
          <></>
        )
      }
      style={{ height: 35, letterSpacing: secureTextEntry ? -1 : 0 }}
      fieldStyle={{
        backgroundColor: '#efefef',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        width,
      }}
      color={theme.textColor}
      placeholderTextColor="#a8a8a8"
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType}
    />
  );
};

export default TextField;
