import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './navigation/StackNavigation';
import { ApiProvider } from './store/ApiProvider';
const Layout = (): React.ReactElement => {
  return (
    <>
      <NavigationContainer>
        <ApiProvider>
          <StackNavigation />
        </ApiProvider>
      </NavigationContainer>
    </>
  );
};
export default Layout;
