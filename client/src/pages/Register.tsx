import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../consts/colors';

export const Register = () => {
  return (
    <View style={styles.background}>
      <Text>Register</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },

  text: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '600',
  },
});
