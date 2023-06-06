import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from '../components/Button';
import {colors} from '../consts/colors';
import {UserContext} from '../context/UserContext';
import {fonts} from '../consts/fonts';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useCountUp} from 'use-count-up';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export const Home = () => {
  const {user, setUser} = React.useContext(UserContext);

  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const {value: balanceCountUp} = useCountUp({
    isCounting: true,
    end: user?.balance || 0,
    duration: 1.5,
    decimalPlaces: 2,
    easing: 'easeInCubic',
  });

  const handleDeposit = () => {
    navigation.navigate('Deposit');
  };

  const handleTransfer = () => {
    navigation.navigate('Transfer');
  };

  const handleLogout = () => {
    setUser(undefined);
    navigation.navigate('InitialPage');
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.text}>
          Hi <Text style={{color: colors.accent}}>{user?.name}</Text>
        </Text>
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.75}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.balanceWrapper}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balance}>{balanceCountUp + ' €'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Deposit" onPress={handleDeposit} size="full" />
        <Button title="Transfer" onPress={handleTransfer} size="full" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    paddingTop: getStatusBarHeight() + 30,
    paddingBottom: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },

  header: {
    width: '100%',

    paddingHorizontal: 20,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: colors.clear,
    fontSize: 32,
    fontFamily: fonts.regular,
    textAlign: 'left',
  },

  logout: {
    fontSize: 20,
    color: colors.error,
    fontFamily: fonts.medium,
  },

  balanceWrapper: {
    paddingVertical: 20,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
  },

  balanceLabel: {
    color: colors.clear,
    fontSize: 24,
    fontFamily: fonts.regular,
  },

  balance: {
    color: colors.accent,
    fontSize: 52,
    fontFamily: fonts.bold,
  },

  buttonContainer: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
});
