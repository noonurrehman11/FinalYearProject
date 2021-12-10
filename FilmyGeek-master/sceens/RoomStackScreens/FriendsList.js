import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { showmsg } from '../../components/ShowMsg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModelLoader from '../../components/ModelLoader'
import Ionicons from 'react-native-vector-icons/Ionicons'

const FriendsList = ({ navigation, route }) => {

    const [friendsList, setFriendsList] = useState(useSelector(state => state.user.friendsList))
    const [loading, setLoading] = useState(false)
    const { roomName, movie, roomId } = route.params;

    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

    const sendRequest = (data) => {
        console.log("Room request", data)
        setLoading(true)
        firestore().collection('roomRequest').doc(data.id).set({
            owner: userInfo.username,
            roomName: roomName,
            movie: movie.name,
            movieLink: movie.movieLink,
            roomId: roomId,
        })
            .then(() => {
                console.log("Room request Send ")
                setLoading(false)
                showmsg("Join room request send")
                setFriendsList(friendsList.filter(friend => friend.id !== data.id))
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                showmsg("Error sending friend ")
            })
    }

    return (
        <View style={styles.container}>
            <View style={{display:'flex',justifyContent:'space-around',flexDirection:'row'}}>
                <Text style={styles.headText}>Friends List</Text>
                <Ionicons name="md-checkmark-done" size={30} color={COLORS.primary} onPress={() => {
                    navigation.navigate('MovieRoomCreatedScreen', { roomId })
                }} />
            </View>

            {friendsList.length > 0 ?
                <ScrollView showsVerticalScrollIndicator={false}>
                    {friendsList.map((friend, index) => {
                        return (
                            <View style={styles.cardContainer} key={index}>
                                <Image source={{ uri: friend.photo }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                                <Text style={styles.text}>{friend.username}</Text>

                                <TouchableOpacity onPress={() => { sendRequest(friend) }}>
                                    {/* <Entypo name="cross" size={30} color="#fff" /> */}
                                    <MaterialIcons name="add" size={30} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>No Friends Found</Text>
                </View>
            }
            {loading ? <ModelLoader /> : null}
        </View>
    )
}

export default FriendsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: '#000',

    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 46,0.6)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        padding: 10
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        flex: 1
    },
    headText: {
        color: 'rgba(255, 0, 46,0.6)',
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft: 20,
        textAlign: 'center',
        marginBottom: 20

    },
})
