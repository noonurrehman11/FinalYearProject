import React, { useState, useEffect } from 'react';
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
    AlertIOS,
    Image,
    ScrollView,
    Modal

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import * as CONSTANTS from '../../constant/constant.js';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { addMovieRecommendation, requestMovie } from '../../services/Movies/Movie.js';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES } from '../../constants/theme.js';
import { showmsg } from '../../components/ShowMsg.js';
import { useSelector } from 'react-redux';
import { addPost } from '../../services/Post/index.js';
import ModelLoader from '../../components/ModelLoader.js';
import { set } from 'immer/dist/internal';

const AddFeed = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [movie, setMovie] = useState({});

    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const movies = useSelector(state => {
        return state.movie.moviesList.map(item => { return { name: item.name, movieDetail: item, timestamp: new Date() } })
    })
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })
    // console.log("USerInfo", userInfo)

    // useEffect(() => {
    //     // console.log(movies)
    //     return () => {
    //         console.log("unmount")
    //     }
    // }, [])


    const onChangeHandler = (val) => {
        // console.log("Val", val)
        let matches = []
        if (val.length > 0) {
            matches = movies.filter(usr => {
                const regex = new RegExp(`${val}`, 'gi')
                return usr.name.match(regex)
            })
        }
        // console.log('matches', matches)
        setSuggestions(matches)
        setText(val)
    }


    const post = async () => {

        if (Object.keys(movie).length !== 0) {
            // console.log(movie)
            if (message.length) {
                setLoading(true)

                addMovieRecommendation({ movieName: movie.name, picture: movie.picture, movieId: movie._id, uId: userInfo._id, userName: userInfo.username })
                    .then(async(res) => {
                        if (res.success) {
                            const resp =await addPost({_id:userInfo._id,name:userInfo.username,
                                posts:{message,photo:movie.picture,timestamp:new Date(),name:userInfo.username,profile:userInfo.photo}})
                            console.log("Add Resp",resp)
                            if(resp.success){
                                setLoading(false)
                                showmsg("Post created successfully")
                                setMovie({})
                                setMessage('')
                            } else {
                                setLoading(false)
                                showmsg("Unable to post")
                                setMovie({})
                                setMessage('')
                            }

                        } else {
                            setLoading(false)
                            showmsg("Unable to post")
                            setMovie({})
                            setMessage('')
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                        showmsg("Unable to post")
                        setMovie({})
                        setMessage('')
                    })
            } else {
                showmsg("Please enter post details")
            }
        } else {
            showmsg('Please select movie')
        }

    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{

                    }}
                    onPress={() => {
                        // console.log('Open Drawer')
                        navigation.goBack()
                    }
                    }>
                    <Ionicons name="arrow-back-sharp" color="white" size={35} />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }} >Add New Feed</Text>
                <TouchableOpacity
                    style={{

                    }}
                    onPress={() => {
                        // console.log('Open Drawer')

                    }
                    }>

                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={{ color: 'rgba(255, 0, 46,0.7)', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>CREATE POST</Text>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primary, marginTop: 20, borderRadius: 25, display: 'flex', flexDirection: 'row' }}>
                        <AntDesign name="search1" size={25} color={COLORS.primary} style={{ padding: 10 }} />
                        <TextInput
                            style={{ color: '#fff' }}
                            placeholder="Search Movie"
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

                {suggestions.length !== 0 ?
                    <ScrollView style={{ paddingTop: 20 }}>
                        {suggestions.length !== 0 &&
                            suggestions.map((val, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    // console.log('click', val.movieDetail.picture)
                                    setMovie(val.movieDetail)

                                    setText('')
                                    setSuggestions([])
                                }}>
                                    <View style={styles.movieContainer}>
                                        <Image source={{ uri: val.movieDetail.picture }} style={{ width: 50, height: 50, borderRadius: 25 }} />

                                        <Text style={styles.text}>{val.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                    :
                    <>
                        <TextInput
                            style={{ alignSelf: 'flex-start', color: '#fff', borderBottomColor: 'rgba(255, 0, 46,0.7)', borderBottomWidth: 1, marginTop: 10, width: '100%' }}
                            placeholder="Enter post details"
                            placeholderTextColor='#fff'
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setMessage}
                            value={message}
                        />
                        <TouchableOpacity style={{ backgroundColor: 'rgba(255, 0, 46,0.7)', marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
                            onPress={post}
                        >
                            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Post</Text>
                        </TouchableOpacity>
                    </>
                }

            </View>
            {loading && (
                <ModelLoader />
            )}
        </View>
    );
};

export default AddFeed;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        display: 'flex',
        paddingHorizontal: SIZES.padding,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 30
    },
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

});
