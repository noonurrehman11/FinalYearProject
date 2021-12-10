import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SignInScreen from '../Login';
import SignupScreen from '../Singup';
const Stack = createNativeStackNavigator();
const AuthStack = ({ setLoggedIn}) => {
    return (
        <Stack.Navigator
            initialRouteName="SignInScreen"
            screenOptions={{
                headerShown: false,
                backgroundColor: 'black',
            }}>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
