import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../consts/colors';
import {fonts} from '../consts/fonts';

type ButtonSize = 'small' | 'medium' | 'large' | 'full';
type ButtonScheme = 'primary' | 'secondary';

interface ButtonProps {
  title: string;
  size?: ButtonSize;
  scheme?: ButtonScheme;
  onPress: () => void;
}

const Button = ({
  title,
  size = 'medium',
  scheme = 'primary',
  onPress,
}: ButtonProps) => {
  const backgroundColor = scheme === 'primary' ? colors.primary : 'transparent';
  const color = scheme === 'primary' ? 'white' : colors.primary;
  const borderColor = scheme === 'primary' ? 'transparent' : colors.primary;

  const buttonStyles = [
    styles.button,
    styles[size],
    {backgroundColor, borderColor},
  ];

  const textStyles = [
    styles.text,
    {color},
    size === 'small'
      ? {fontSize: 12}
      : size === 'large' || size === 'full'
      ? {fontSize: 22}
      : {fontSize: 16},
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.75}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3, // Added border
  },
  text: {
    fontFamily: fonts.semiBold,
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  full: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
});

export default Button;
