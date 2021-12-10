import React from 'react';
import RoomScreen from '../RoomStackScreens/RoomScreen';

import MoviesList from '../RoomStackScreens/MoviesList';
import FriendsList from '../RoomStackScreens/FriendsList';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import FeedScreen from '../FeedStackScreen/FeedScreen';
import AddFeed from '../FeedStackScreen/AddFeed';
const Stack = createNativeStackNavigator();
const FeedStack = ({navigation, route}) => {
 
  return (
    <Stack.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{
        headerShown: false,
        backgroundColor: 'black',
      }}>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="AddFeed" component={AddFeed} />
    </Stack.Navigator>
  );
};

export default FeedStack;
