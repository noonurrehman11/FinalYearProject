import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './sceens/Login';
import SignUp from './sceens/Singup';
import SplashScreen from './sceens/SplashScreen';
import TabStack from './sceens/navigations/TabStack';
import AuthStack from './sceens/navigations/AuthStack';
import SignInScreen from './sceens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, AlertIOS, } from 'react-native';
import Loader from './components/Loader';
import DrawerStack from './sceens/navigations/DrawerStack';
import { Provider, useDispatch, useSelector } from 'react-redux'

import { addUserInfo } from './redux/UsersSlice';
import { loggedIn } from './redux/LoginSlice';
import RoomStack from './sceens/navigations/RoomStack';
import MovieRoom from './sceens/MovieRoom';
import PlayMovie from './sceens/HomeStackScreens/PlayMovie';

const Rootstack = createStackNavigator();

const App = ({ navigation }) => {

  const logged=useSelector(state=>state.login.isLogin)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  console.log(logged)
  useEffect(async () => {
    setLoading(true)
    try {
      const jsonValue = await AsyncStorage.getItem('data')
      const resp = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("APPP", resp)
      if (resp) {
        dispatch(loggedIn(true))
        dispatch(addUserInfo(resp))
        
      }
      setLoading(false)
    }
    catch (e) {
      setLoading(false)
      showmsg("Unable to read data")


    }

  }, [])
  const showmsg = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  if (loading) {
    return <Loader />
  }
  return (

    <NavigationContainer>
      <Rootstack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!logged ?
          (<>
            <Rootstack.Screen name="SplashScreen" component={SplashScreen} />
            <Rootstack.Screen name="auth" component={AuthStack}/>
            
          </>
          )
          : (
            <>
            <Rootstack.Screen name="home" >
              {() => <DrawerStack />}
            </Rootstack.Screen>
            <Rootstack.Screen name="RoomStack" component={RoomStack} />
            <Rootstack.Screen name="MovieRoom" component={MovieRoom} />
            <Rootstack.Screen name="PlayMovie" component={PlayMovie} />
            
            </>
          )}
      </Rootstack.Navigator>
    </NavigationContainer>

  )
};
export default App;
