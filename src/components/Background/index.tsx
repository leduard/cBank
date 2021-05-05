import React, { useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import { ThemeContext } from 'styled-components/native';

interface BackgroundProps {
  colorHeight?: number;
  style?: ViewStyle;
  inverted?: boolean;
}

const Background: React.FC<BackgroundProps> = ({
  colorHeight = 300,
  style,
  inverted = false,
  children,
}) => {
  const theme = useContext(ThemeContext);

  return inverted ? (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          minHeight: colorHeight,
          backgroundColor: theme.background,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.secondaryColor,
          borderTopLeftRadius: colorHeight === 0 ? 0 : 25,
          borderTopRightRadius: colorHeight === 0 ? 0 : 25,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}>
        {children}
      </View>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          height: colorHeight,
          backgroundColor: theme.secondaryColor,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}>
        {children}
      </View>
    </View>
  );
};

export default Background;
