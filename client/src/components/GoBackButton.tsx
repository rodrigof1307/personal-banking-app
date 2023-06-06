import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../consts/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {fonts} from '../consts/fonts';

type GoBackButtonProps = {
  onPress?: () => void;
  title?: string;
};

export const GoBackButton = ({onPress, title = ''}: GoBackButtonProps) => {
  const navigation = useNavigation<StackNavigationProp<NavigationParamsList>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.goBack}>
      <TouchableOpacity
        onPress={onPress ? onPress : handleGoBack}
        style={styles.buttonStyle}>
        <Icon name="chevron-left" size={40} color={colors.clear} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.buttonStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  goBack: {
    width: '100%',
    position: 'absolute',
    top: getStatusBarHeight() + 15,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 50,
    paddingHorizontal: 5,
  },
  textStyle: {
    flex: 1,
    color: colors.clear,
    fontFamily: fonts.bold,
    fontSize: 28,
    textAlign: 'center',
  },
});
