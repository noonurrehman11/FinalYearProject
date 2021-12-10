import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar,Text, View, TouchableOpacity, TextInput, ScrollView, Image, Platform, ToastAndroid, AlertIOS } from 'react-native'
import { useSelector } from 'react-redux'
import { COLORS, SIZES } from '../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { checkRequestExists, sendRequest } from '../../services/Friends'
import ModelLoader from '../../components/ModelLoader'

const AddFriend = ({ navigation }) => {

    const [value, setValue] = useState([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    // const friendsList = useSelector(state => state.user.friendsList)
    let usersList = useSelector(state => {
        return state.user.usersList.map(item => { return { name: item.username, _id: item._id,photo:item.photo } })
    })
    const friendsList = useSelector(state => {
        return state.user.friendsList.map(item => item.username)
    })

    let newUsersList = usersList.filter(item => friendsList.indexOf(item.name) === -1)
    

    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

    // console.log("New Friendslist,", newUsersList)
    useEffect(() => {
        // console.log(usersList)
        
        
        // console.log(usersList.filter(item => item.name !== userInfo.username))
        // usersList = usersList.filter(item => item.name !== userInfo.username)
        return () => {
            console.log("unmount")
        }
    }, [])


    const onChangeHandler = (val) => {
        // console.log("Val", val)
        let matches = []
        if (val.length > 0) {
            matches = newUsersList.filter(usr => {
                const regex = new RegExp(`${val}`, 'gi')
                return usr.name.match(regex)
            })
        }
        // console.log('matches', matches)
        setSuggestions(matches)
        setText(val)
    }
    const showmsg = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    };
console.log(suggestions)
    return (
        <View style={styles.container}>

            <View style={{ borderWidth: 1, borderColor: COLORS.primary, borderRadius: 25, display: 'flex', flexDirection: 'row' }}>
                <AntDesign name="search1" size={25} color={COLORS.primary} style={{ padding: 10 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Search by username"
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

            <ScrollView style={{ paddingTop: 20 }} >
                {suggestions.length !== 0 &&
                    suggestions.map((val, index) => (

                        <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: COLORS.primary, borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                            <Image source={{uri:val.photo}} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <Text style={styles.text}>{val.name}</Text>

                            {friendsList.filter(item => item._id === val._id).length === 0 && (
                                <TouchableOpacity key={index} onPress={async () => {
                                    // console.log('click', val)
                                    // setText('')
                                    // setSuggestions([])
                                    setLoading(true)
                                    checkRequestExists(val._id,userInfo._id ).then(res => {
                                        console.log(res.exists)
                                        if (res.exists) {
                                            console.log('Request Exists')
                                            setLoading(false)
                                            showmsg('Request Already Sent')

                                        }
                                        else {
                                            console.log('Request Not Exists')
                                            sendRequest(val._id,
                                                { id: userInfo._id, username: userInfo.username, photo:userInfo.photo },
                                                userInfo._id)
                                                .then(res => {
                                                    console.log("Friend Request Send")
                                                    setLoading(false)
                                                    showmsg('Friend Request Send Successfully')
                                                    setSuggestions(suggestions.filter(item => item._id !== val._id))
                                                    // setSuggestions(suggestions)
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                    setLoading(false)
                                                    showmsg('Error while sending request')
                                                })
                                        }
                                    })
                                        .catch(err => {
                                            console.log('err', err)
                                            setLoading(false)
                                            showmsg('Error while sending request')
                                        })
                                }}>
                                    <AntDesign name="adduser" size={25} color={COLORS.primary} />
                                </TouchableOpacity>
                            )}
                        </View>

                    ))
                }
            </ScrollView>
            {loading && (
                <ModelLoader />
            )}
        </View>
    )
}

export default AddFriend

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: '#000',

    },
    text: {
        fontSize: 20,
        color: '#fff',
        paddingLeft: 10,
        flex: 1
    }
})
