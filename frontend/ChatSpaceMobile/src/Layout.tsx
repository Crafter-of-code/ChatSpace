import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './navigation/StackNavigation';
const Layout = (): React.ReactElement => {
  return (
    <>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
};
export default Layout;
