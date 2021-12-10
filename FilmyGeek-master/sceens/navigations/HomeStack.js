import React from 'react';
import HomeScreen from '../HomeStackScreens/HomeScreen';
import MovieDetail from '../HomeStackScreens/MovieDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AllMovies from '../AllMovies';
import MovieRoom from '../MovieRoom';
import PlayMovie from '../HomeStackScreens/PlayMovie';
const Stack = createNativeStackNavigator();
const HomeStack = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MovieDetail') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({
        tabBarStyle: {display: 'flex', backgroundColor: '#000'},
      });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        backgroundColor: 'black',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
      <Stack.Screen name="AllMovies" component={AllMovies} />
      <Stack.Screen name="MoviesRoom" component={MovieRoom} />
    </Stack.Navigator>
  );
};

export default HomeStack;
