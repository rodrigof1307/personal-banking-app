import React, {useContext} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import Button from '../components/Button';
import {useForm, Controller} from 'react-hook-form';
import {UserContext} from '../context/UserContext';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {colors} from '../consts/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {GoBackButton} from '../components/GoBackButton';

type FormData = {
  amount: string;
};

export const Deposit = () => {
  const {user, setUser} = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>();
  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const handleDeposit = async (data: FormData) => {
    try {
      const dto = {
        receiverID: user?.id,
        amount: parseFloat(data.amount),
      };
      const res = await axios.post(
        'http://localhost:3333/transactions/deposit',
        dto,
      );
      if (res.status === 201) {
        const newUser = await axios.get(
          'http://localhost:3333/users/' + user?.id,
        );
        setUser(newUser.data);
        navigation.navigate('Home');
        reset();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Transaction Failed');
    }
  };

  return (
    <View style={styles.container}>
      <GoBackButton />
      <View style={styles.formsContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, errors.amount && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Amount"
              keyboardType="numeric"
            />
          )}
          name="amount"
          rules={{required: 'This is required.'}}
        />
        <Text style={styles.errorText}>{errors.amount?.message ?? ''}</Text>

        <Button
          size="full"
          title="Deposit"
          onPress={handleSubmit(handleDeposit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  formsContainer: {
    width: '100%',
    zIndex: -1,
    marginTop: getStatusBarHeight(),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: colors.accent,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginBottom: 10,
    color: 'red',
    fontSize: 14,
  },
});
