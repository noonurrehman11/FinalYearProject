import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, Platform, ToastAndroid, AlertIOS } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import Entypo from 'react-native-vector-icons/Entypo'
import FriendCard from '../../components/FriendCard'
import { getFriends } from '../../services/Friends'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { addFriendsList } from '../../redux/UsersSlice'
import Loader from '../../components/Loader'
import ModelLoader from '../../components/ModelLoader'

const FriendRequests = ({ navigation }) => {

    const [friendsRequestList, setFriendsRequestList] = useState([])
    
    const [loading, setLoading] = useState(false)


    const dispatch = useDispatch()

    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

    
    useEffect(() => {
        setLoading(true)
        console.log("User id", userInfo._id)
        firestore().collection('friendRequests')
            .doc(userInfo._id).collection('requests')
            .onSnapshot(querySnapshot => {
                console.log(querySnapshot.empty)
                if (!querySnapshot.empty) {

                    console.log(querySnapshot.docs.map(doc => doc.data()))
                    setFriendsRequestList(querySnapshot.docs.map(doc => doc.data()))
                }
                setLoading(false)
            },
            error => {
                console.log(error)
                setLoading(false)
            }
            )

    }, [])
    const showmsg = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    };
    const onAccept = (data) => {
        // console.log("Friend Id", data)
        setLoading(true)
        firestore().collection('friends').doc(userInfo._id).collection('list').doc(data.id).set(data)
            .then(() => {
                // console.log("F")
                firestore().collection('friends').doc(data.id).collection('list').doc(userInfo._id).set({
                    id: userInfo._id,
                    username: userInfo.username,
                    photo: userInfo.photo,
                })
                    .then(() => {
                        // console.log("F")
                        firestore().collection('friendRequests').doc(userInfo._id).collection('requests').doc(data.id).delete()
                            .then(() => {
                                setLoading(false)
                                showmsg("Friend Request Accepted")
                                setFriendsRequestList(friendsRequestList.filter(friend => friend.id !== data.id))
                            })
                            .catch(error => {
                                setLoading(false)
                                console.log(error)
                                showmsg("Error deleting friend request")
                            })
                    })
                    .catch(error => {
                        setLoading(false)
                        console.log(error)
                        showmsg("Error while accepting friend request")
                    })
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
                showmsg("Error while accepting friend request")
            })

    }
    const onReject = (data) => {
        // console.log("Friend Id", data)
        setLoading(true)
        firestore().collection('friendRequests').doc(userInfo._id).collection('requests').doc(data.id).delete()
            .then(() => {
                setLoading(false)
                console.log("Friend request deleted")
                showmsg("Friend request deleted")
                setFriendsRequestList(friendsRequestList.filter(friend => friend.id !== data.id))
            }
            )
            .catch(error => {
                setLoading(false)
                console.log(error)
                showmsg("Error deleting friend request")
            })
    }

    // if (loading) {
    //     return <Loader />
    // }
    return (
        <View style={styles.container}>
            {friendsRequestList.length > 0 ?
                <ScrollView showsVerticalScrollIndicator={false}>
                    {friendsRequestList.map((friend, index) => {
                        return <FriendCard request={true} onAccept={onAccept} onReject={onReject}
                            data={{ id: friend.id, username: friend.username, photo: friend.photo }} key={index} />


                    })}
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>No Friend Requests Found</Text>
                </View>
            }
            {loading ? <ModelLoader/>:null}
        </View>
    )
}

export default FriendRequests

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: '#000',

    }
})
