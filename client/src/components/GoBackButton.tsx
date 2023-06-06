import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
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
        <Text style={styles.goBackText}>{'Go Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.buttonStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  goBack: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: getStatusBarHeight() + 15,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 80,
    paddingHorizontal: 5,
  },
  goBackText: {
    fontSize: 16,
    color: colors.clear,
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  textStyle: {
    flex: 1,
    color: colors.clear,
    fontFamily: fonts.bold,
    fontSize: 28,
    textAlign: 'center',
  },
});
