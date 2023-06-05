import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Transactions} from '../pages/Transactions';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../consts/colors';
import {fonts} from '../consts/fonts';
import {HomeRoutes} from './home.routes';

type TabIconProps = {
  route: any;
  color: string;
  size: number;
};

const TabIcon = ({route, color, size}: TabIconProps) => {
  let iconName = '';

  if (route.name === 'HomeRoutes') {
    iconName = 'home';
  } else if (route.name === 'Transactions') {
    iconName = 'documents';
  }

  // You can return any component that you like here!
  return <Icon name={iconName} size={size} color={color} />;
};

export const BottomTabRoutes = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => TabIcon({route, color, size}),
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondaryButton,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: fonts.semiBold,
          fontSize: 11,
        },
        tabBarStyle: {
          paddingTop: 10,
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
