import React from 'react';
import {Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home/Home';

import Octicons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeActive, HomeIcon, ProfileIcon, ProfileActive, BookingActive, BookingIcon} from '../assets';
import colors from '../utils/colors';
import Profile from '../screens/Home/Profile';
import {useTheme} from 'react-native-paper';
import Progress from '../screens/Home/Progress';

const Tab = createMaterialBottomTabNavigator();

function MyTabs(props) {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneAnimationEnabled={false}
      activeColor={colors.activeTabColor}
      inactiveColor={'#9E9E9E'}
      barStyle={{backgroundColor: colors.white}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, Image}) => {
            return (Image = focused ? <HomeActive /> : <HomeIcon />);
          },
        }}
      />
       <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          title: 'Progress',
          tabBarIcon: ({focused, Image}) => {
            return (Image = focused ? <BookingActive /> : <BookingIcon />);
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Settings',
          tabBarIcon: ({focused, Image}) => {
            return (Image = focused ? <ProfileActive /> : <ProfileIcon />);
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
