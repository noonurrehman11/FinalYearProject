import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  ImageBackground,
  ScrollView,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme, useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../constants';
import { addFriendsList } from '../../redux/UsersSlice';
import { getPost } from '../../services/Post';
import { showmsg } from '../../components/ShowMsg';

const FeedScreen = ({ navigation }) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const [friendsList, setFriendsList] = useState(useSelector(state => state.user.friendsList))
  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return state.user.userInfo
  })

  // console.log('FriendsList', friendsList)

  const get = async (id) => {
    console.log("id", id)
    const resp = await getPost(id)
    if (resp.success) {
      if (resp.results !== null) {
        // console.log("Post",resp.results.posts)
        // resp.results.posts.forEach(post =>{
        //   console.log(post.message)
        // })
        const arr = resp.results.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        // console.log("unsorted")  
        // resp.results.posts.forEach(post => {
        //   console.log(post.message)
        // })
        // console.log("Sorted")
        // arr.forEach(post => {
        //   console.log(post.message)
        // })

        return arr
      }
    } else {
      // console.log(resp)
      showmsg('Error to get to posts')
    }
  }

  useFocusEffect(
    //   ()=>{
    //   console.log("Focus")
    //   if (friendsList.length) {
    //     friendsList.forEach(friend => {
    //       get(friend.id)
    //     })
    //     get(userInfo._id)
    //   } else{
    //     get(userInfo._id)
    //   }
    // }
    React.useCallback(() => {

      const unsubscribe = async () => {
        setLoading(true)
        if (friendsList.length) {

          let list = friendsList.map(friend => friend)
          list.push({ "id": userInfo._id, "photo": userInfo.photo, "username": userInfo.username })
          // console.log('list', list)
          list.forEach(async (friend) => {
            const arr = await get(friend.id)
            console.log("Posts", arr)
            const array=[...posts, ...arr]
            const func=posts => [...posts, ...arr]
            const srt=func(array)
            setPosts(srt.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
          })
          // console.log("user   post")
          // get(userInfo._id)
          setLoading(false)
        } else {
          await get(userInfo._id)
          setLoading(false)
        }
      }
      unsubscribe()
      return () => {
        console.log('unmount')
        setPosts([])
        
      };
    }, [])

  )

  useEffect(() => {
    // setLoading(true)

    // console.log("Posts", posts)
    // setLoading(false)

  }, [])


  if (loading) {
    return <Loader />
  }

  return (
    <View style={{ backgroundColor: "#121212", flex: 1 }}>
      <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{

          }}
          onPress={() => {
            // console.log('Open Drawer')
            navigation.toggleDrawer()
          }
          }>
          <MaterialCommunityIcons name="menu" color="white" size={35} />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }} >Movies Feed</Text>
        <TouchableOpacity
          style={{

          }}
          onPress={() => {
            // console.log('Open Drawer')
            navigation.navigate('AddFeed')
          }
          }>
          <MaterialIcons name="add" color="white" size={35} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingTop: 20 }}>
        {posts.map((post, index) => {
          return (
            <View key={index} style={{ backgroundColor: "rgba(30,30,30,1)", marginHorizontal: 20, marginBottom: 30, padding: 20, borderRadius: 25 }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                  source={{ uri: post.profile }}
                />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ color: "rgba(255, 0, 46,0.7)", marginLeft: 25, fontSize: 25, fontWeight: 'bold', flex: 1 }}>{post.name}</Text>
                  <Text style={{ color: "rgba(255, 0, 46,0.7)", marginLeft: 25, fontSize: 15, fontWeight: 'bold', flex: 1 }}>{new Date(post.timestamp).toISOString().split('T')[1].split('.')[0]}</Text>
                  <Text style={{ color: "rgba(255, 0, 46,0.7)", marginLeft: 25, fontSize: 15, fontWeight: 'bold', flex: 1 }}>{new Date(post.timestamp).toISOString().split('T')[0]}</Text>

                </View>
              </View>

              <Text style={{ color: '#fff', marginTop: 20, fontSize: 15, paddingBottom: 20 }}>{post.message}</Text>
              <Image
                style={{ width: '100%', height: 250, }}
                resizeMode='stretch'

                source={{ uri: post.photo }}
              />
            </View>
          )
        })}


      </ScrollView>
    </View>
  );
};

export default FeedScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  ScrollView: {
    marginTop: 5,
  },
  textInput: {
    marginTop: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    padding: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  cardd: {
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 5,
    padding: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  carddText: {
    fontSize: 19,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 5,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
