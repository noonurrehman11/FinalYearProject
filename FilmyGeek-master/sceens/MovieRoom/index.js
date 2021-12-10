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
    AlertIOS,
    BackHandler, Modal
} from 'react-native';
import Video from 'react-native-video';
const { width, height } = Dimensions.get('screen');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAdminChat, sendAdminMessage } from '../../services/Chat';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';
// import * as CONSTANT from '../constant/constant.js';
// import * as Progress from 'react-native-progress';   

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const MovieRoom = ({ navigation, route }) => {
    const [chat, setChat] = useState([]);
    const [roomData, setRoomData] = useState({});

    const [userOnlineEmail, setuserOnlineEmail] = useState(null);
    const [userOnlineName, setuserOnlineName] = useState(null);
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

    // const code = route.params.code;
    const [message, setMessage] = useState('');
    const scrollRef = useRef()

    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const setAcceptRequest = route.params.setAcceptRequest;
    // console.log("setAcceptRequest ",setAcceptRequest)

    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('contain');

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'contain') setScreenType('cover');
        else setScreenType('contain');
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);


    useEffect(() => {
        getOnlineUser();
        navigation.setOptions({
            tabBarStyle: { display: 'none' },
            headerShown: false,
        });
        BackHandler.addEventListener('hardwareBackPress', () => {
            console.log("Back button pressed")
            setShowModal(true)
            return true;
        });
    }, []);
    useFocusEffect(() => {
        // console.log("Routes", route.params.roomData);
        if (chat === undefined) {
            fetchChat();
        }
    });
    useEffect(async () => {
        setLoading(true);


        firestore().collection('rooms').doc(route.params.roomData.roomId)
            .get()
            .then(doc => {
                console.log("room Data", doc.data())
                setRoomData({ ...doc.data(), id: doc.id });
                firestore().collection('roomChats').doc(doc.id)
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
            })
            .catch(err => {
                showmsg("Error while fetching room details")
                console.log(err)
                setLoading(false);
            })
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
        firestore().collection('roomChats').doc(roomData.id).collection('messages').add({
            message: message,
            displayName: userInfo.username,
            email: userInfo.email,
            uid: userInfo._id,
            photo: userInfo.photo,
            timestamp: firestore.FieldValue.serverTimestamp(),
        })
            .then(res => {
                setMessage('')
            })
            .catch(err => {
                console.log(err)
                showmsg(JSON.stringify(err))
            })
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

                <TouchableHighlight
                    onPress={() => {
                    }}
                >
                    <Text></Text>
                </TouchableHighlight>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingLeft: 25 }}>Movie Room</Text>
                </View>
                {/* <Text style={styles.name}>{route.params.title}</Text> */}

                <TouchableHighlight
                    underlayColor="rgba(255,255,255,0.2)"
                    onPress={() => {
                        setShowModal(true)
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Ionicons
                        name="exit-outline"
                        color="white"
                        size={30}
                    />
                </TouchableHighlight>
            </View>
            <View style={{ flex: 1 }}>
                <Video
                    onEnd={onEnd}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    paused={paused}
                    ref={videoPlayer}
                    resizeMode={screenType}
                    onFullScreen={isFullScreen}
                    source={{
                        uri:
                            roomData.movieLink
                    }}
                    style={styles.mediaPlayer}
                    volume={10}
                />
                <MediaControls
                    duration={duration}
                    isLoading={isLoading}
                    mainColor="#333"
                    onFullScreen={onFullScreen}
                    onPaused={onPaused}
                    onReplay={onReplay}
                    onSeek={onSeek}
                    onSeeking={onSeeking}
                    playerState={playerState}
                    progress={currentTime}
                    toolbar={renderToolbar()}
                />
            </View>

            {!chat.length
                ?
                <View style={{ paddingBottom: height - 620, paddingTop: height - 650 }}>
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
                                    {/* <Text style={styles.time}>
                                    <Text>
                                    {new Date(item?.timestamp?.toDate())?.toUTCString().split(',')[1].split(' ')[1]}
                                    </Text>
                                    <Text>{` `}</Text>
                                    <Text>
                                    {new Date(item?.timestamp?.toDate())?.toUTCString().split(',')[1].split(' ')[2]}
                                    </Text>
                                    <Text>{` `}</Text>
                                    <Text>
                                    {new Date(item?.timestamp?.toDate())?.toUTCString().split(',')[1].split(' ')[3]}
                                    </Text>
                                </Text> */}
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
                    paddingBottom: 20
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
            {showModal ? (
                <Modal transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>

                            <Text style={styles.modalText}>Are you want to exit room?</Text>
                            <TouchableOpacity style={styles.buttonStyle}
                                onPress={() => {
                                    setAcceptRequest(false)
                                    setShowModal(false)
                                    navigation.goBack()
                                }}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            ) : null}
        </View>

    );
};

export default MovieRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        width,
        height: 80,
        backgroundColor: 'rgba(255, 0, 46,0.7)',
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
        height: height - 450,
        width,
        paddingLeft: 20,
        paddingRight: 20,
        maxHeight: height - 450,
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
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        // margin: 20,
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 35,

    },

    modalText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center",
        color: '#f2f2f2',

    },
    textStyle: {
        color: '#fff', fontSize: 15, fontWeight: 'bold', textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: 'rgba(255, 0, 46,0.7)', marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10
    }
});
