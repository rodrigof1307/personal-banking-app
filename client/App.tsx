/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MainRoutes} from './src/routes/main.routes';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from './src/context/UserContext';

function App(): JSX.Element {
  const [user, setUser] = React.useState<UserAccount | undefined>(undefined);

  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <UserContext.Provider value={{user, setUser}}>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle={'light-content'} />
          <MainRoutes />
        </QueryClientProvider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
export default App;
