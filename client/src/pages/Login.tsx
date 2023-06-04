import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Button from '../components/Button';
import {colors} from '../consts/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post('http://localhost:3333/auth/login', data);
      if (res.status === 200) {
        navigation.navigate('BottomTab');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
        name="email"
        rules={{required: true, pattern: /^\S+@\S+$/i}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
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
});
