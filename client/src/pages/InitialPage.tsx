import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../consts/colors';
import {fonts} from '../consts/fonts';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export const InitialPage = () => {
  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Banking Made Easy</Text>
        <Text style={styles.description}>
          Welcome to the future of finance at Swift Bank. Manage your finances
          with ease anywhere at any time.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" size="full" onPress={handleLogin} />
        <Button
          title="Register"
          size="full"
          scheme="secondary"
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },

  textContainer: {
    paddingTop: 16,
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  buttonContainer: {
    paddingBottom: 16,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  title: {
    width: '90%',

    color: colors.accent,
    fontFamily: fonts.bold,
    fontSize: 36,
    textAlign: 'left',
  },

  description: {
    width: '90%',

    marginTop: 10,
    marginBottom: 40,

    color: colors.clear,
    fontFamily: fonts.regular,
    fontSize: 20,
    textAlign: 'left',
  },
});
