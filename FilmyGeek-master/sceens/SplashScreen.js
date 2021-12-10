import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ImageBackground
      source={require('../Images/SplashBG.png')}
      style={
        (styles.container, {width: '100%', height: '100%', resizeMode: ''})
      }>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Animatable.View
        style={styles.header}
        animation="fadeInDownBig"></Animatable.View>
      <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: 'red',
            },
          ]}>
          WellCome to FilmyGeeks !!
        </Text>
        <Text style={styles.text}>Stream what you want</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('auth')}>
            <LinearGradient
              colors={['red', '#000', 'red']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Let's Explore</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.5,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
