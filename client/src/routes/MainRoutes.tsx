import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import {BottomTabRoutes} from './BottomTabRoutes';
import {InitialPage} from '../pages/InitialPage';

export const MainRoutes = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="InitialPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="InitialPage" component={InitialPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={Register} />
      <Stack.Screen name="BottomTab" component={BottomTabRoutes} />
    </Stack.Navigator>
  );
};
