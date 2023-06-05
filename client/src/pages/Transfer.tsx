import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import Carousel from 'react-native-snap-carousel';
import {useForm, Controller} from 'react-hook-form';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {colors} from '../consts/colors';
import {GoBackButton} from '../components/GoBackButton';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type FormData = {
  email?: string;
  IBAN?: string;
  amount: string;
};

export const Transfer = () => {
  const {user, setUser} = useContext(UserContext);

  const [transactionType, setTransactionType] = useState<
    'email' | 'IBAN' | undefined
  >();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const carousel = useRef<Carousel<any>>(null);

  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const handleTransfer = async (data: FormData) => {
    try {
      let dto: object = {
        senderID: user?.id,
        amount: parseFloat(data.amount),
      };
      if (data.IBAN) {
        dto = {...dto, receiverIBAN: data.IBAN};
      }
      if (data.email) {
        dto = {...dto, receiverEmail: data.email};
      }
      const res = await axios.post(
        'http://localhost:3333/transactions/send',
        dto,
      );
      if (res.status === 201) {
        const newUser = await axios.get(
          'http://localhost:3333/users/' + user?.id,
        );
        setUser(newUser.data);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Transaction Failed');
    }
  };

  const handleTransactionType = (type: 'email' | 'IBAN') => {
    setTransactionType(type);
    carousel.current?.snapToNext();
  };

  const snapToPrev = () => {
    carousel.current?.snapToPrev();
  };

  const renderItem = ({index}: {item: any; index: number}) => {
    if (index === 0) {
      return (
        <View style={styles.container}>
          <GoBackButton />
          <View style={styles.buttonContainer}>
            <Button
              title="Send to Email"
              size="full"
              onPress={() => handleTransactionType('email')}
            />
            <Button
              title="Send to IBAN"
              size="full"
              onPress={() => handleTransactionType('IBAN')}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <GoBackButton onPress={snapToPrev} />
        <View style={styles.formsContainer}>
          {transactionType === 'email' && (
            <>
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
                rules={{
                  required: 'This is required.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                }}
                defaultValue=""
              />
              <Text style={styles.errorText}>
                {errors.email?.message ?? ''}
              </Text>
            </>
          )}

          {transactionType === 'IBAN' && (
            <>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={[styles.input, errors.IBAN && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="IBAN"
                    autoCorrect={false}
                  />
                )}
                name="IBAN"
                rules={{
                  required: 'This is required.',
                  pattern: {
                    value:
                      /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/,
                    message: 'Invalid IBAN',
                  },
                }}
                defaultValue=""
              />
              <Text style={styles.errorText}>{errors.IBAN?.message ?? ''}</Text>
            </>
          )}

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.amount && styles.inputError]}
                placeholder="Amount"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="amount"
            rules={{required: 'This is required.'}}
          />
          <Text style={styles.errorText}>{errors.amount?.message ?? ''}</Text>

          <Button
            size="full"
            title="Transfer"
            onPress={handleSubmit(handleTransfer)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        ref={carousel}
        data={[{}, {}]}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        renderItem={renderItem}
        scrollEnabled={false}
      />
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

  buttonContainer: {
    width: '100%',
    zIndex: -1,
    marginTop: getStatusBarHeight(),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
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
