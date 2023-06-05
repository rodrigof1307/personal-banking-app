import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../consts/colors';
import {UserContext} from '../context/UserContext';

export const Home = () => {
  const {user} = React.useContext(UserContext);

  return (
    <View style={styles.background}>
      <Text>{user?.balance}</Text>
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
