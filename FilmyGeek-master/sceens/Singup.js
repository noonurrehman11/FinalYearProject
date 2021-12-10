import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
  AlertIOS,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as CONSTANT from '../constant/constant';
import { signup } from '../services/Auth/auth';
import { openCamera } from '../utils/Camera';
import CameraModel from '../components/CameraModel';

const SignupScreen = ({ navigation }) => {
  const manual_data = {
    username: '',
    email: '',
    password: '',
  };

  const [data, setData] = React.useState({
    username: '',
    password: '',
    email: '',
    confirm_password: '',
    check_textInputChange: false,
    check_email: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    match_password: true,
  });
  const [openModal, setOpenModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageError, setImageError] = useState(false)

  const changeusername = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const SignupUser = async data => {
    if (imageUrl.length === 0) {
        setImageError(true)
    } else {
      setImageError(false)
      console.log("DAta", {...data,photo:imageUrl})
      const resp = await signup({...data,photo:imageUrl})
      console.log("abcc", resp)
      if (resp?.success) {
        ToastAndroid.show(`User account created: `, ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        if (resp?.error?.code === 11000) {

          showmsg("username or email already exist")
        } else {
          showmsg("Unable to signup")
        }

      }
    }

    // await CONSTANT.API.post('/signup', data)
    //   .then(response => {
    //     ToastAndroid.show(`User account created: `, ToastAndroid.SHORT);
    //     navigation.goBack();
    //   })
    //   .catch(error => showmsg(`${error.message}`));
  };
  const createuser = () => {
    if (data.username.trim().length < 1) {
      showmsg('Please Enter Username');
    } else if (data.email.trim().length < 1) {
      showmsg('Please Enter Email');
    } else if (data.check_email === false) {
      showmsg('Please Enter Valid Email');
    } else if (
      data.password.trim().length < 1 ||
      data.confirm_password.trim().length < 1
    ) {
      showmsg('Please enter password');
    } else if (data.match_password === false) {
      showmsg(`Password dont match`);
    } else {
      if (Platform.OS === 'android') {
        manual_data.username = data.username;
        manual_data.email = data.email;
        manual_data.password = data.password;
        SignupUser(manual_data);
      } else {
        // implementation for IOS
      }
    }
  };
  const changeemail = val => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_email: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_email: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (data.confirm_password === val) {
      setData({
        ...data,
        match_password: true,
        password: val,
      });
    } else {
      setData({
        ...data,
        match_password: false,
        password: val,
      });
    }
  };

  const handleConfirmPasswordChange = val => {
    if (data.password === val) {
      setData({
        ...data,
        match_password: true,
        confirm_password: val,
      });
    } else {
      setData({
        ...data,
        match_password: false,
        confirm_password: val,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const showmsg = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  const closeModel = () => {
    setOpenModal(false)
  }
  return (
    <ImageBackground
      source={require('../Images/SplashBG.png')}
      style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Animatable.View
        style={styles.header}
        animation="fadeInDownBig"></Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_header}>Register Now!</Text>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => changeusername(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              keyboardType="email-address"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => changeemail(val)}
            />
            {data.check_email ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {data.password.trim().length > 1 &&
            data.confirm_password.trim().length > 1 &&
            data.match_password ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.msg}>Password Match.</Text>
            </Animatable.View>
          ) : (
            data.password.trim().length > 1 &&
            data.confirm_password.trim().length > 1 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password not match.</Text>
              </Animatable.View>
            )
          )}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Upload Profile Picture
          </Text>
          <View style={{ ...styles.action, marginTop: 0 }}>
            <TouchableOpacity style={{ backgroundColor: 'rgba(255, 0, 46,0.7)', marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
              onPress={() => { setOpenModal(true) }}
            >
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Upload</Text>
            </TouchableOpacity>
          </View>
          {imageError && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Profile picture is required</Text>
            </Animatable.View>
          )}

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>

            <TouchableOpacity
              style={styles.signIn}
              onPress={() => createuser()}>
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
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          {openModal ?
            <CameraModel
              setImageUrl={setImageUrl}
              setOpenModal={setOpenModal}
              closeModel={closeModel} />
            : null}
        </ScrollView>
      </Animatable.View>
    </ImageBackground>
  );
};

export default SignupScreen;

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
    flex: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'orange',
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#fff',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  msg: {
    color: '#00FF00',
    fontSize: 14,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
