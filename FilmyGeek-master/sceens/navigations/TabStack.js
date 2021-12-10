import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
//import HomeScreen from '../HomeStackScreens/HomeScreen';
import FeedScreen from '../FeedStackScreen/FeedScreen';
import RoomScreen from '../RoomStackScreens/RoomScreen';
import HomeStack from './HomeStack';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import RoomStack from './RoomStack';
import FeedStack from './FeedStack';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: COLORS.black,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabStack = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      shifting={true}
      labeled={false}
      sceneAnimationEnabled={false}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: 'black',
          height: 50,
          borderTopColor: 'transparent',
        },
      }}
      barStyle={{backgroundColor: 'red'}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          backgroundColor: '#000',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                Top: 10,
              }}>
              <Ionicons
                name="home"
                size={30}
                style={{
                  color: focused ? 'red' : COLORS.white,
                }}
              />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="RoomStack"
        component={RoomStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather
              name="plus"
              size={40}
              style={{color: focused ? 'red' : COLORS.black}}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="FeedStack"
        component={FeedStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                Top: 10,
              }}>
              <Entypo
                name="news"
                size={25}
                style={{color: focused ? 'red' : COLORS.white}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 0,
  },
});
