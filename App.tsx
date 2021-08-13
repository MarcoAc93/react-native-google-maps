import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PermissionsProvider } from './app/context/permissions';
import { StackNavigation } from './app/navigation/StackNavigation';

const AppStateProvider = ({ children }: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppStateProvider>
        <StackNavigation />
      </AppStateProvider>
    </NavigationContainer>
  );
};

export default App;
