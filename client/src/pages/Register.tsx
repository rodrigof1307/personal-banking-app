import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Button from '../components/Button';
import {colors} from '../consts/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type FormData = {
  name: string;
  phone: string;
  occupation?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<FormData>();

  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {confirmPassword, ...rest} = data;
    try {
      const res = await axios.post('http://localhost:3333/auth/register', rest);
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
            style={[styles.input, errors.name && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
          />
        )}
        name="name"
        rules={{required: true}}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
        )}
        name="phone"
        rules={{required: true}}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Occupation (Optional)"
          />
        )}
        name="occupation"
        defaultValue=""
      />

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

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Confirm Password"
            secureTextEntry
          />
        )}
        name="confirmPassword"
        rules={{
          required: true,
          validate: value => value === password || 'The passwords do not match',
        }}
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

export default Register;
