import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../components/Button';
import axios from 'axios';
import {useQuery} from 'react-query';

export const InitialPage = () => {
  const {isLoading, data} = useQuery('test', async () => {
    return axios.get('http://localhost:3333/').then(res => {
      return res.data;
    });
  });

  return (
    <View style={styles.background}>
      {isLoading ? <Text>Loading...</Text> : <Text>{data}</Text>}
      <Button />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'red',
    fontSize: 24,
    fontWeight: '600',
  },
});
