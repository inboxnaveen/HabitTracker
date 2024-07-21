import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../components/RootNavigation';
import AuthStack from './authNavigation';
import BottomTab from './BottomTabNavigation';
import SplashScreenPage from '../screens/splashscreen';
import HeaderLeft from '../components/HeaderLeft';
import colors from '../utils/colors';
import EditProfile from '../screens/editProfile';
import OnboardingScreen from '../screens/OnboardingScreen';
import HabitList from '../screens/HabitList';
import CreateHabit from '../screens/CreateHabit';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreenPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HabitList"
          component={HabitList}
          options={{
            headerTitle: 'Select Habit',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 18, fontFamily: 'Poppins-SemiBold'},
            headerLeft: () => <HeaderLeft navigation={navigationRef} />,
          }}
        />

<Stack.Screen
          name="CreateHabit"
          component={CreateHabit}
          options={{
            headerTitle: 'Create Habit',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 18, fontFamily: 'Poppins-SemiBold'},
            headerLeft: () => <HeaderLeft navigation={navigationRef} />,
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: 'Edit Profile',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTitleAlign: 'center',

            headerTitleStyle: {fontSize: 18, fontFamily: 'Poppins-SemiBold'},
            headerLeft: () => <HeaderLeft navigation={navigationRef} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
