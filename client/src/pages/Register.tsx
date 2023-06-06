import React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
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
    reset,
  } = useForm<FormData>();

  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();
  const {setUser} = React.useContext(UserContext);

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {confirmPassword, ...rest} = data;
    try {
      const res = await axios.post('http://localhost:3333/auth/register', rest);
      if (res.status === 201) {
        navigation.navigate('BottomTab');
        setUser(res.data);
        reset();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'height'}
      keyboardVerticalOffset={-60}>
      <GoBackButton title="Register" />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
            placeholderTextColor={colors.accentPlaceholder}
          />
        )}
        name="name"
        rules={{required: 'This field is required'}}
        defaultValue=""
      />
      <Text style={styles.errorText}>{errors.name?.message ?? ''}</Text>

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
        rules={{
          required: 'This field is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
            message:
              'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
          },
        }}
        defaultValue=""
      />
      <Text style={styles.errorText}>{errors.password?.message ?? ''}</Text>

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
            placeholderTextColor={colors.accentPlaceholder}
          />
        )}
        name="confirmPassword"
        rules={{
          required: 'This field is required',
          validate: value => value === password || 'The passwords do not match',
        }}
        defaultValue=""
      />
      <Text style={styles.errorText}>
        {errors.confirmPassword?.message ?? ''}
      </Text>

      <Button title="Submit" size="full" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: colors.secondary,
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
  errorText: {
    marginBottom: 10,
    color: 'red',
    fontSize: 14,
  },
});

export default Register;
