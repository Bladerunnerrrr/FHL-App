/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react';
import { Image as RNImage, ImageProperties } from 'react-native';
import { Text as DefaultText, View as DefaultView, TouchableOpacity} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

interface TouchableOpacityProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export { TouchableOpacity };

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedTouchableOpacity({ children, onPress, style }: TouchableOpacityProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor: colors.primary }, style]}
      activeOpacity={0.7}
    >
      <View style={{ padding: 10 }}>
        <Text style={{ color: colors.text, fontWeight: 'bold' }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

interface Props extends ImageProperties {
  source: any;
}

export function Image(props: Props) {
  return <RNImage {...props} />;
}
