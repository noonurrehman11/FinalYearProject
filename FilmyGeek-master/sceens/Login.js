import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  AlertIOS,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import SocialButton from '../components/SocialButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as CONSTANT from '../constant/constant';
import { login } from '../services/Auth/auth';
import ModelLoader from '../components/ModelLoader';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../redux/LoginSlice';
import { addUserInfo } from '../redux/UsersSlice';

const SignInScreen = ({ navigation }) => {
  useEffect(async () => {
    getData();
    GoogleSignin.configure({
      //scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId:
        '893619867027-uk2b7urannjubuth8dgtb5bn6glqscce.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
    isSignedIn();

  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('profile');
      return jsonValue != null ? navigation.navigate('home') : null;
    } catch (e) {
      console.log(error);
    }
  };
  const { colors } = useTheme();
  const manual_data = { email: '', password: '', type: 'manual' };
  const init_google = { email: '', password: '', type: 'google' };

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidPassword: true,
    isValidUser: true,
  });

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()


  const textInputChange = val => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;

    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
    if (val.trim().length < 1) {
      setData({
        ...data,
        isValidUser: true,
      });
    }
  };
  const showmsg = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const SignInUser = async data => {
    setLoading(true)
    const resp = await login(data)
    console.log("Login", resp)
    if (resp?.success) {
      try {
        if (resp.results.status) {
          const jsonValue = JSON.stringify(resp.results)
          await AsyncStorage.setItem('data', jsonValue)
          setLoading(false)
          showmsg('User signed in!');
          dispatch(addUserInfo(resp.results))
          dispatch(loggedIn(true))
        } else {
          setLoading(false)
          showmsg("Account disabled by admin");
        }
      } catch (e) {
        // saving error
        setLoading(false)
        showmsg("Unable to sign in!");
      }

    } else {
      setLoading(false)
      showmsg(resp?.error);
    }
  };
  const SignInWithemail = () => {
    if (data.email.trim().length < 1) {
      showmsg('Please Enter email');
    } else if (data.isValidUser === false) {
      showmsg('Please Enter Valid email');
    } else if (data.password.trim().length < 1) {
      showmsg('Please Enter Password');
    } else if (data.isValidPassword === false) {
      showmsg('Please Enter Valid Password');
    } else {
      if (Platform.OS === 'android') {
        manual_data.email = data.email;
        manual_data.password = data.password;
        SignInUser({
          email: data.email,
          password: data.password,
          // type: 'manual',
        });
      } else {
        // implementation for IOS
      }
    }
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error.message);
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Log In');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('edit__', userInfo);
      setUser(userInfo);
    } catch (error) {
      console.log('CurrentError: ', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../Images/SplashBG.png')}
      style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Animatable.View
        style={styles.header}
        animation="fadeInDownBig"></Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <Text style={styles.text_header}>Welcome!</Text>
        <Text
          style={[
            styles.text_footer,
            {
              color: '#fff',
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#fff" size={20} />
          <TextInput
            placeholder="Your email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            style={[
              styles.textInput,
              {
                color: '#fff',
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>email is not Valid.</Text>
          </Animatable.View>
        )}
        <Text
          style={[
            styles.text_footer,
            {
              color: '#fff',
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#fff" size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: '#fff',
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="#fff" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: '#fff', marginTop: 15 }}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => SignInWithemail()}>
            <LinearGradient
              colors={['red', '#000', 'red']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen')}
            style={[
              styles.signIn,
              {
                borderColor: 'red',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'white',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#fff"
              onPress={() => signIn()}
            />
          </View>
        ) : null}
        {loading && (
          <ModelLoader />
        )}
      </Animatable.View>
    </ImageBackground>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
