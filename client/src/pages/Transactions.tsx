import React, {useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {TransactionItem} from '../components/TransactionItem';
import {GoBackButton} from '../components/GoBackButton';
import {useQuery} from 'react-query';
import {useFocusEffect} from '@react-navigation/core';
import {colors} from '../consts/colors';

type ExtendedTransaction = Transaction & {
  sender?: UserAccount;
  receiver?: UserAccount;
};

export const Transactions = () => {
  const {user} = useContext(UserContext);
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3333/transactions/all/' + user?.id,
      );
      return res.data as ExtendedTransaction[];
    } catch (error) {
      console.log(error);
    }
  };

  const {data, refetch} = useQuery('transactions', fetchTransactions);

  useFocusEffect(() => {
    refetch();
  });

  return (
    <View style={styles.container}>
      <GoBackButton title="Transactions" />
      <FlatList
        data={data}
        style={styles.flatListContainer}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TransactionItem
            id={item.id}
            amount={item.amount}
            createdAt={item.createdAt}
            iban={item.receiverIBAN}
            status={item.status}
            senderInfo={item.sender}
            receiverInfo={item.receiver}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingTop: getStatusBarHeight() + 70,
  },

  flatListContainer: {
    width: '90%',
    marginHorizontal: 'auto',
  },

  contentContainer: {
    paddingBottom: 20,
  },
});
