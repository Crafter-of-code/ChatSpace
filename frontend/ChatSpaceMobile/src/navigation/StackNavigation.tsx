import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Welcome from '../screen/Welcome';
import Detail from '../screen/Details';
import Chat from '../screen/Chat';
const stack = createStackNavigator();
const StackNavigation = (): React.ReactElement => {
  return (
    <>
      <stack.Navigator
        initialRouteName="chat"
        screenOptions={{
          headerShown: false,
        }}
      >
        <stack.Screen name="welcome" component={Welcome} />
        <stack.Screen name="detail" component={Detail} />
        <stack.Screen name="chat" component={Chat} />
      </stack.Navigator>
    </>
  );
};
export default StackNavigation;
