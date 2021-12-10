import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import Entypo from 'react-native-vector-icons/Entypo'
import FriendCard from '../../components/FriendCard'
import { getFriends } from '../../services/Friends'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { addFriendsList } from '../../redux/UsersSlice'
import Loader from '../../components/Loader'
import { showmsg } from '../../components/ShowMsg'

const Friends = ({ navigation }) => {

    const [friendsList, setFriendsList] = useState(useSelector(state => state.user.friendsList))
    const [loading, setLoading] = useState(false)


    const dispatch = useDispatch()

    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

console.log('fList',friendsList)
    useEffect(() => {
        setLoading(true)
        if (friendsList.length === 0) {
            firestore().collection('friends')
                .doc(userInfo._id).collection('list')
                .onSnapshot(snapshot => {
                    console.log("Friendsssss", snapshot.empty)
                    if (!snapshot.empty) {
                        dispatch(addFriendsList(snapshot.docs.map(doc => doc.data())))
                        setFriendsList(snapshot.docs.map(doc => doc.data()))
                    }else{
                        setFriendsList([])
                    }
                    setLoading(false)
                },
                    error => {
                        console.log(error)
                        showmsg("Error while fetching friends")
                        setLoading(false)
                    })
        }
        setLoading(false)


    }, [])

    const onDelete = (data) => {
        console.log("Friend Id", data)
        firestore().collection('friends').doc(userInfo._id).collection('list').doc(data.id).delete()
            .then(() => {
                firestore().collection('friends').doc(data.id).collection('list').doc(userInfo._id).delete()
                    .then(() => {
                        console.log("Friend  deleted")
                        showmsg("Unfriend Successfully")
                        dispatch(addFriendsList(friendsList.filter(friend => friend.id !== data.id)))
                        setFriendsList(friendsList.filter(friend => friend.id !== data.id))
                    }
                    )
                    .catch(error => {
                        console.log(error)
                        showmsg("Error deleting friend ")
                    })
            }
            )
            .catch(error => {
                console.log(error)
                showmsg("Error deleting friend ")
            })
    }

    if (loading) {
        return <Loader />
    }
    return (
        <View style={styles.container}>
            {friendsList.length > 0 ?
                <ScrollView showsVerticalScrollIndicator={false}>
                    {friendsList.map((friend, index) => {
                        return <FriendCard onDelete={onDelete}
                            data={{ id: friend.id, username: friend.username, photo: friend.photo }} key={index} />
                    })}
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>No Friends Found</Text>
                </View>
            }
        </View>
    )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: '#000',

    }
})
