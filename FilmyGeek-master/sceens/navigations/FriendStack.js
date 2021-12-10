import React from 'react';
import HomeScreen from '../HomeStackScreens/HomeScreen';
import MovieDetail from '../HomeStackScreens/MovieDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Friends from '../Friends';
import AddFriend from '../AddFriend';
import FriendRequests from '../FriendRequests';
import { COLORS } from '../../constants';
import { TouchableOpacity, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();
const FriendStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator
            initialRouteName="Friends"
            screenOptions={{
                headerShown: true,
                backgroundColor: 'black',
                headerStyle: { backgroundColor: 'black', },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25,
                },
                headerTitleAlign: 'center',
            }}>
            <Stack.Screen name="Friends" component={Friends}
                options={{
                    headerTitle: 'Friends',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 50,
                            }}
                            onPress={() => {
                                // console.log('Open Drawer')
                                navigation.toggleDrawer()
                            }
                            }>
                            <MaterialCommunityIcons name="menu" color='#fff' size={35} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 15,
                                }}
                                onPress={() => {
                                    // console.log('Open Drawer')
                                    navigation.navigate('AddFriend')
                                }
                                }>
                                <AntDesign name="adduser" color='#fff' size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    // console.log('Open Drawer')
                                    navigation.navigate('FriendRequests')
                                }
                                }>
                                <Image source={require('../../assets/icons/friend-request.png')} style={{width:30,height:30}}/>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <Stack.Screen name="AddFriend" component={AddFriend}
                options={{
                    headerTitle: 'Add Friends',
                }} />
            <Stack.Screen name="FriendRequests" component={FriendRequests}
                options={{
                    headerTitle: 'Friend Requests',
                }}
            />
        </Stack.Navigator>
    );
};

export default FriendStack;
