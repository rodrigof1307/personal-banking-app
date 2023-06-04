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
  const backgroundColor =
    scheme === 'primary' ? colors.primaryButton : colors.secondaryButton;
  const color = colors.primary;

  const buttonStyles = [styles.button, styles[size], {backgroundColor}];

  const textStyles = [
    styles.text,
    {color},
    size === 'small'
      ? {fontSize: 12}
      : size === 'large' || size === 'full'
      ? {fontSize: 20}
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
