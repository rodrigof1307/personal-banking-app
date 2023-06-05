import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../consts/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const GoBackButton = () => {
  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack} style={styles.goBack}>
      <Icon name="chevron-left" size={40} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    top: getStatusBarHeight() + 10,
    left: 10,
  },
});
