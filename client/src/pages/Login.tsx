import React, {useContext} from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Button from '../components/Button';
import {colors} from '../consts/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {GoBackButton} from '../components/GoBackButton';
import {UserContext} from '../context/UserContext';
import {IP_ADDRESS} from '../consts/IP_address';

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>();

  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();
  const {setUser} = useContext(UserContext);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(
        `http://${IP_ADDRESS}:3333/auth/login`,
        data,
      );
      if (res.status === 200) {
        navigation.navigate('BottomTab');
        setUser(res.data);
        reset();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Wrong Credentials');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <GoBackButton title="Login" />
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
            placeholderTextColor={colors.accentPlaceholder}
          />
        )}
        name="email"
        rules={{
          required: 'This field is required',
          pattern: {value: /^\S+@\S+$/i, message: 'Invalid email'},
        }}
        defaultValue=""
      />
      <Text style={styles.errorText}>{errors.email?.message ?? ''}</Text>
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
            placeholderTextColor={colors.accentPlaceholder}
          />
        )}
        name="password"
        rules={{required: 'This field is required'}}
        defaultValue=""
      />
      <Text style={styles.errorText}>{errors.password?.message ?? ''}</Text>

      <Button title="Login" size="full" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.secondary,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 5,
    padding: 10,
    color: colors.accent,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    marginBottom: 10,
    color: 'red',
    fontSize: 14,
  },
});
