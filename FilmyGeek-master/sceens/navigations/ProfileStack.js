import React from 'react';
import RoomScreen from '../RoomStackScreens/RoomScreen';

import MoviesList from '../RoomStackScreens/MoviesList';
import FriendsList from '../RoomStackScreens/FriendsList';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Profile from '../ProfileStackScreen/Profile';
import EditPassword from '../ProfileStackScreen/EditPassword';
const Stack = createNativeStackNavigator();
const ProfileStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{
                headerShown: false,
                backgroundColor: 'black',
            }}>
            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen name="EditPasswordScreen" component={EditPassword} />
            
        </Stack.Navigator>
    );
};

export default ProfileStack;
