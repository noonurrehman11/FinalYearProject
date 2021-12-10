import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Custom Sidebar
import CustomDrawerMenu from './CustomDrawerMenu';
import HomeScreen from '../HomeStackScreens/HomeScreen';
import { login } from '../../services/Auth/auth';
import TabStack from './TabStack';
import SignInScreen from '../Login';
import AdminChat from '../AdminChat';
import RequestMovie from '../RequestMovie';
import SearchScreen from '../SearchScreen';
import { COLORS } from '../../constants';
import Complaint from '../Complaint';
import FriendStack from './FriendStack';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../redux/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileStack from './ProfileStack';
import JoinRoom from '../JoinRoom/JoinRoom';
import MovieRoom from '../MovieRoom';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerStack = () => {
  const dispatch=useDispatch()
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: COLORS.primary,
        itemStyle: { marginVertical: 25 },
        headerShown: false,
        drawerLabelStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff', },
        // drawerActiveBackgroundColor: '#e91e63',
        drawerActiveBackgroundColor: 'rgba(255, 0, 46,0.7)',
      }}
      drawerContent={(props) => <CustomDrawerMenu {...props} />}>
      <Drawer.Screen
        name="TabStack"
        options={{ drawerLabel: 'Home', }}
        component={TabStack}
      />
      <Drawer.Screen
        name="SignInScreen"
        options={{ drawerLabel: 'Admin Chat' }}
        component={AdminChat}
      />
      <Drawer.Screen
        name="FriendStack"
        options={{ drawerLabel: 'Friends' }}
        component={FriendStack}
      />
      <Drawer.Screen
        name="SearchScreen"
        options={{ drawerLabel: 'Search Movie' }}
        component={SearchScreen}
      />
      {/* <Drawer.Screen
        name="JoinRoom"
        options={{ drawerLabel: 'Join Room' }}
        component={JoinRoom}
      /> */}
     
      <Drawer.Screen
        name="RequestMovie"
        options={{ drawerLabel: 'Request A Movie' }}
        component={RequestMovie}
      />
      <Drawer.Screen
        name="ProfileStack"
        options={{ drawerLabel: 'Profile' }}
        component={ProfileStack}
      />
      
      <Drawer.Screen
        name="Complaint"
        options={{ drawerLabel: 'Report A Problem' }}
        component={Complaint}
      />
      
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({});
