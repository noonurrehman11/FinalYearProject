import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    ToastAndroid,
    AlertIOS
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAdminChat, sendAdminMessage } from '../../services/Chat';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
// import * as CONSTANT from '../constant/constant.js';
// import * as Progress from 'react-native-progress';   

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const AdminChat = ({ navigation, route }) => {
    const [chat, setChat] = useState([]);
    const [userOnlineEmail, setuserOnlineEmail] = useState(null);
    const [userOnlineName, setuserOnlineName] = useState(null);
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })
    // const code = route.params.code;
    const [message, setMessage] = useState('');
    const scrollRef = useRef()
    useEffect(() => {
        getOnlineUser();
        navigation.setOptions({
            tabBarStyle: { display: 'none' },
            headerShown: false,
        });
    }, []);
    useFocusEffect(() => {
        if (chat === undefined) {
            fetchChat();
        }
    });
    useEffect(async () => {
        setLoading(true);

        firestore().collection('chats').doc(userInfo._id)
            .collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    setChat(snapshot.docs.map(doc => doc.data()))
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            },
                error => {
                    setLoading(false);
                    showmsg('Error while fetching messages')
                    console.log(error);
                }
            )
    }, []);

    // console.log("CHATS", chat)


    const fetchChat = async () => {
        try {
            // await CONSTANT.API.get(`/chat/${route.params.code}`)
            //     .then(response => {
            //         setChat(response.data);
            //     })
            //     .catch(error => console.log(error));
        } catch (e) {
            // Handle error
            console.log(e);
        }
    };

    const getOnlineUser = async () => {
        try {
            if (userOnlineEmail == null || userOnlineName == null) {
                let email = await AsyncStorage.getItem('email');
                let name = await AsyncStorage.getItem('name');

                if (email !== null) {
                    setuserOnlineEmail(JSON.parse(email));
                    setuserOnlineName(JSON.parse(name));
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    const sendMsg = () => {
        firestore().collection('chats')
            .doc(userInfo._id).get()
            .then(doc => {
                console.log("DOCSS",doc)
                if (!doc.exists) {
                    firestore().collection('chats').doc(userInfo._id).set({ name: userInfo.username })
                        .then(doc => {
                            firestore().collection('chats').doc(userInfo._id).collection('messages').add({
                                timestamp: firestore.FieldValue.serverTimestamp(),
                                message: message,
                                displayName: userInfo.username,
                                email: userInfo.email,
                                uid: userInfo._id,
                                photo: userInfo.photo
                            })
                            .then(() => {
                                showmsg('Message sent successfully')
                            })
                            .catch(err => {
                                showmsg('Error while sending message')
                                console.log(err)
                                
                            })
                        })
                        .catch(err => {
                            showmsg('Error while sending message')
                            console.log(err)
                        })
                } else {
                    firestore().collection('chats').doc(userInfo._id).collection('messages').add({
                        timestamp: firestore.FieldValue.serverTimestamp(),
                        message: message,
                        displayName: userInfo.username,
                        email: userInfo.email,
                        uid: userInfo._id,
                        photo: userInfo.photo
                    })
                    .then(() => {
                        
                    })
                    .catch(err => {
                        showmsg('Error while sending message')
                        
                    })
                }
            })
            .catch(err => {
                showmsg('Error while sending message')
                
            })
        setMessage('');
    };
    const showmsg = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    };
    if (loading) {
        return <Loader />
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableHighlight
                        underlayColor="rgba(255,255,255,0.2)"
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons name="menu" color="white" size={35} />
                    </TouchableHighlight>
                    <View style={{}}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Admin Chat</Text>
                    </View>
                    {/* <Text style={styles.name}>{route.params.title}</Text> */}
                </View>
                <TouchableHighlight
                    underlayColor="rgba(255,255,255,0.2)"
                    onPress={() => {
                        console.log('press');
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        color="white"
                        size={30}
                    />
                </TouchableHighlight>
            </View>

            {!chat.length
                ?
                <View style={{ paddingBottom: height - 480, paddingTop: height - 500 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Send First Message</Text>
                </View>
                :
                <ScrollView style={styles.chattingWrapper}
                    ref={scrollRef}
                    onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
                >
                    {chat.length ? (
                        chat.map((item, index) => (
                            <View
                                key={index}
                                style={
                                    item.email === userInfo.email
                                        ? styles.mineChat
                                        : styles.othersChat
                                    // :styles.mineChat
                                }>
                                <Text style={styles.username}>{item.displayName}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.text}>{item.message}</Text>
                                </View>
                            </View>
                        ))
                    ) : null}
                </ScrollView>
            }
            <View
                style={{
                    marginHorizontal: 20,
                    alignSelf: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                }}>
                <TextInput
                    placeholder="Type here.."
                    placeholderTextColor="#fff"

                    value={message}
                    onChangeText={text => setMessage(text)}
                    style={{
                        width: '80%',
                        borderWidth: 0.5,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: 'rgba(255, 0, 46,0.7)',
                        marginRight: 10,
                        color: '#fff',
                    }}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgba(255, 0, 46,0.7)',
                        width: ' 20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                    disabled={message ? false : true}
                    onPress={() => sendMsg()}>
                    <Text style={{ color: 'white' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AdminChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        width,
        height: 80,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 20,
        justifyContent: 'space-between',
    },
    profile: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginLeft: 10,
    },
    name: {
        fontSize: 22,
        color: 'white',
        marginLeft: 8,
    },
    chattingWrapper: {
        height: height - 200,
        width,
        paddingLeft: 20,
        paddingRight: 20,
        maxHeight: height - 200,
    },
    othersChat: {
        alignSelf: 'flex-start',
        padding: 10,
        backgroundColor: 'rgba(255, 0, 46,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    mineChat: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(255, 0, 46,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    username: {
        fontSize: 14,
        color: 'black',
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        alignSelf: 'flex-start',
        color: '#fff'
    },
    time: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.6)',
        alignSelf: 'flex-end',
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 10,
    },
});
