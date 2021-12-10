import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  ImageBackground,
  Platform,
  ToastAndroid,
  AlertIOS
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import * as CONSTANTS from '../../constant/constant.js';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { requestMovie } from '../../services/Movies/Movie.js';
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES } from '../../constants/theme.js';
import { showmsg } from '../../components/ShowMsg.js';
import { useSelector } from 'react-redux';
import ModelLoader from '../../components/ModelLoader.js';

const RoomScreen = ({ navigation,route }) => {
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState('');
  // const movie=route.params.movie;
  const movie={
    "__v": 0, "_id": "618a711ea6b6ed0023f56341", "age": true, "cast": "Sam Worthington", "createdAt": "2021-11-09T13:01:18.453Z", "genre": "Action", "isHollywood": true, "movieId": 19995, "movieLink": "https://firebasestorage.googleapis.com/v0/b/filmy-geek.appspot.com/o/download.jpegTue%20Nov%2009%202021%2018%3A00%3A00%20GMT%2B0500%20(Pakistan%20Standard%20Time)?alt=media&token=7ed8acb9-e8c9-4a9f-999b-fc6790c6fdac", "name": "Avatar", "picture": "https://firebasestorage.googleapis.com/v0/b/filmy-geek.appspot.com/o/avatar.jpegTue%20Nov%2009%202021%2018%3A00%3A38%20GMT%2B0500%20(Pakistan%20Standard%20Time)?alt=media&token=a0279697-d2c8-45a4-9b3d-f3227f280187", "progress": "0%", "ratings": 7.8, "releaseDate": "2021-11-09T00:00:00.000Z", "runningTime": 162, "status": true, "summary": "Jake, who is paraplegic, replaces his twin on the Na'vi inhabited Pandora for a corporate mission. After the natives accept him as one of their own, he must decide where his loyalties lie.", "trailerLink": "https://firebasestorage.googleapis.com/v0/b/filmy-geek.appspot.com/o/download.jpegTue%20Nov%2009%202021%2017%3A59%3A51%20GMT%2B0500%20(Pakistan%20Standard%20Time)?alt=media&token=f377bf15-1acc-475b-aa77-2034a4213bce", "updatedAt": "2021-11-10T02:13:21.750Z", "views": 0}
  const userInfo = useSelector(state => {
    return state.user.userInfo
})



  const next = () => {
    setLoading(true);
    if (room == '') {
      setLoading(false);
      showmsg("Please enter room name")
    }
    else {
      firestore().collection('rooms').where('roomName', '==', room).get().then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          setLoading(false);
          showmsg("Room name already exists")
        }
        else {
          firestore().collection('rooms').add({
            roomName: room,
            movieName:movie.name,
            movieLink:movie.movieLink,
            owner:userInfo.username,
            ownerId:userInfo._id,
          }).then(function (docRef) {
            setLoading(false);
            showmsg("Room added successfully")
            navigation.navigate('RoomFriendsScreen',{
              roomId:docRef.id,
              roomName:room,
              movie:movie
            })
          })
          .catch(function (error) {
            setLoading(false);
            showmsg("Error while creating room")
          });
        }
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: 'rgba(255, 0, 46,0.7)', fontSize: 25, fontWeight: 'bold' }}>CREATE ROOM</Text>
      <TextInput
        style={{ alignSelf: 'flex-start', borderBottomColor: 'rgba(255, 0, 46,0.7)', borderBottomWidth: 1, marginTop: 10, width: '100%' }}
        placeholder="Enter Room Name"
        placeholderTextColor='#fff'
        onChangeText={setRoom}
        value={room}
      />
      <TouchableOpacity style={{ backgroundColor: 'rgba(255, 0, 46,0.7)', marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
        onPress={next}
      >
        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Next</Text>
      </TouchableOpacity>
      {loading && <ModelLoader />}
    </View>
  );
};

export default RoomScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    display: 'flex',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center'
  },

});
