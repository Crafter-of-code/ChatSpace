import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Welcome from '../screen/Welcome';
import Detail from '../screen/Details';
import Chat from '../screen/Chat';
import { rootStackParameterList } from './NavigationType';
const Stack = createStackNavigator<rootStackParameterList>();
const StackNavigation = (): React.ReactElement => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="chat" component={Chat} />
      </Stack.Navigator>
    </>
  );
};
export default StackNavigation;
