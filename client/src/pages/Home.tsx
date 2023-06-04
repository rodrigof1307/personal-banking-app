import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../consts/colors';

export const Home = () => {
  return (
    <View style={styles.background}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
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
