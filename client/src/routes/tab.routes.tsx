import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Transactions} from '../pages/Transactions';
import {colors} from '../consts/colors';
import {fonts} from '../consts/fonts';
import {HomeRoutes} from './home.routes';

export const BottomTabRoutes = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.accentPlaceholder,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: fonts.semiBold,
          fontSize: 11,
        },
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: colors.secondary,
        },
      })}>
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen name="Transactions" component={Transactions} />
    </Tab.Navigator>
  );
};
