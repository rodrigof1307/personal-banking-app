/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MainRoutes} from './src/routes/MainRoutes';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MainRoutes />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
export default App;
