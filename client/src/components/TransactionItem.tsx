import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../consts/colors';
import {fonts} from '../consts/fonts';
import {UserContext} from '../context/UserContext';

type TransactionItemProps = {
  id: number;
  status: TransactionStatus;
  amount: number;
  createdAt: Date;
  senderInfo?: UserAccount;
  receiverInfo?: UserAccount;
  iban?: string | null;
};

enum TransactionStatusColor {
  ACCEPTED = 'green',
  PENDING = 'yellow',
  REJECTED = 'red',
}

export const TransactionItem = ({
  id,
  status,
  amount,
  createdAt,
  senderInfo,
  receiverInfo,
  iban,
}: TransactionItemProps) => {
  const {user} = useContext(UserContext);

  const isSentTransaction = senderInfo?.id === user?.id;
  const sign = isSentTransaction ? '-' : '+';

  const accountInfo = () => {
    if (isSentTransaction) {
      return iban || receiverInfo?.name + ' (' + receiverInfo?.email + ')';
    }
    if (senderInfo) {
      return senderInfo?.name + ' (' + senderInfo?.email + ')';
    }
    return 'Deposit from Bank';
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.accountInfo}>{accountInfo()}</Text>
        <Text style={styles.amount}>{sign + amount.toFixed(2) + ' €'}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.date}>
          Date: {new Date(createdAt).toLocaleString()}
        </Text>
        <View style={styles.idStatus}>
          <Text style={styles.id}>#{id}</Text>
          <View
            style={{
              ...styles.status,
              backgroundColor: TransactionStatusColor[status],
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: colors.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 6,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountInfo: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  amount: {
    color: colors.accent,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  id: {
    color: colors.primary,
    marginRight: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  date: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  idStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
