/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {InitialPage} from './pages/InitialPage';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.background}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <InitialPage />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

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

export default App;
