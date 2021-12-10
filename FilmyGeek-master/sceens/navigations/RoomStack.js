import React from 'react';
import RoomScreen from '../RoomStackScreens/RoomScreen';

import MoviesList from '../RoomStackScreens/MoviesList';
import FriendsList from '../RoomStackScreens/FriendsList';
import MovieRoomCreated from '../RoomStackScreens/MovieRoomCreated';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const RoomStack = ({navigation, route}) => {
 
  return (
    <Stack.Navigator
      initialRouteName="RoomScreen"
      screenOptions={{
        headerShown: false,
        backgroundColor: 'black',
      }}>
      <Stack.Screen name="RoomScreen" component={RoomScreen} />
      <Stack.Screen name="RoomMovieScreen" component={MoviesList} />
      <Stack.Screen name="RoomFriendsScreen" component={FriendsList} />
      <Stack.Screen name="MovieRoomCreatedScreen" component={MovieRoomCreated} />
    </Stack.Navigator>
  );
};

export default RoomStack;
