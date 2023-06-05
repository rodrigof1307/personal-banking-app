import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../pages/Home';
import {Deposit} from '../pages/Deposit';
import {Transfer} from '../pages/Transfer';

export const HomeRoutes = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="Transfer" component={Transfer} />
    </Stack.Navigator>
  );
};
