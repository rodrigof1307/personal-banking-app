import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../components/Button';
import axios from 'axios';
import {useQuery} from 'react-query';
import {colors} from '../consts/colors';

export const InitialPage = () => {
  const {data} = useQuery('test', async () => {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts/1/')
      .then(res => {
        return JSON.stringify(res.data);
      });
  });

  console.log(data);

  return (
    <View style={styles.background}>
      <Text style={styles.text}>Banking Made Easy</Text>
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
    backgroundColor: colors.secondary,
  },

  text: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '600',
  },
});
