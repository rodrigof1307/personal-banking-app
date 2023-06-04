import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../consts/colors';

export const Transactions = () => {
  return (
    <View style={styles.background}>
      <Text>Transactions</Text>
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