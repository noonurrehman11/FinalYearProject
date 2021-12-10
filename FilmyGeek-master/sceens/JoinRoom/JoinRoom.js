import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
const JoinRoom = ({ navigation }) => {

  const [value, setValue] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  // const [rooms, setRooms] = useSelector(state => {
  //     return state.movie.moviesList.map(item => { return { name: item.name, movieDetail: item } })
  // })
  const [rooms, setRooms] = useState([])


  useEffect(() => {
    firestore().collection('rooms').onSnapshot(querySnapshot => {
      setRooms(querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  }, [])

  console.log('Rooms', rooms)
  const onChangeHandler = (val) => {
    // console.log("Val", val)
    let matches = []
    if (val.length > 0) {
      matches = rooms.filter(usr => {
        const regex = new RegExp(`${val}`, 'gi')
        return usr?.name.match(regex)
      })
    }
    // console.log('matches', matches)
    setSuggestions(matches)
    setText(val)
  }


  return (
    <View style={{ paddingHorizontal: SIZES.padding, backgroundColor: "#000", flex: 1 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingRight: 10
          }}
          onPress={() => {
            // console.log('Open Drawer')
            navigation.toggleDrawer()
          }
          }>
          <MaterialCommunityIcons name="menu" color="white" size={35} />
        </TouchableOpacity>
        <View style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primary, marginTop: 20, borderRadius: 25, display: 'flex', flexDirection: 'row' }}>
          <AntDesign name="search1" size={25} color={COLORS.primary} style={{ padding: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Search Room By Name"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onChangeHandler}
            // onBlur={() => {
            //     setTimeout(() => {
            //         setSuggestions([])
            //     }, 1000)
            // }}
            value={text}
          />
        </View>
      </View>

      <ScrollView style={{ paddingTop: 20 }}>
        {suggestions.length !== 0 &&
          suggestions.map((val, index) => (
            <TouchableOpacity key={index} onPress={() => {
              // console.log('click', val)
              // navigation.navigate('MovieDetail', {
              //   selectedMovie: {
              //     name: val.movieDetail.name, thumbnail: val.movieDetail.picture, details: {
              //       image: val.movieDetail.picture, genre: [val.movieDetail.genre], progress: "0%",
              //       ratings: 7.5, runningTime: 123, age: true
              //     }
              //   }
              // })
              // setText('')
              // setSuggestions([])
            }}>
              <View style={styles.movieContainer}>
                <MaterialCommunityIcons name="theater" size={50} color={COLORS.primary} />
                <Text style={styles.text}>{val.name}</Text>
                <Entypo name="plus" size={30} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default JoinRoom

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#fff',
    paddingLeft: 15,
    flex: 1
  },
  movieContainer: {
    display: 'flex', flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10
  }

})
