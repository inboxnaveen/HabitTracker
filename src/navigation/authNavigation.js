import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderLeft from '../components/HeaderLeft';
import {navigationRef} from '../components/RootNavigation';
import SignIn from '../screens/auth/signin';
import SignUp from '../screens/auth/signup';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerTitleStyle: {fontSize: 20},
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderLeft navigation={navigationRef} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
