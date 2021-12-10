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
    Image,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme, useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../constants';
import { addFriendsList } from '../../redux/UsersSlice';
import { getPost } from '../../services/Post';
import { showmsg } from '../../components/ShowMsg';

const AllMovies = ({ navigation }) => {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const moviesList =useSelector(state=>state.movie.moviesList)
    const [posts, setPosts] = useState([])

    const [friendsList, setFriendsList] = useState(useSelector(state => state.movie.moviesList))
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

    
    console.log("MoviesList",moviesList)


    if (loading) {
        return <Loader />
    }

    return (
        <View style={{ backgroundColor: "#121212", flex: 1 }}>
            <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 0, 46,0.7)', justifyContent: 'space-between' }}>
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
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', textAlign: 'center',paddingRight:20 }} >All Movies</Text>
                <Text></Text>
            </View>
            <FlatList
                
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginTop: SIZES.padding }}
                data={moviesList}
                keyExtractor={item => `${item._id}`}
                renderItem={({ item, index }) => {
                    return (
                        item.status ? (
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate('MovieDetail', {
                                        selectedMovie: {
                                            name: item.name, thumbnail: item.picture, details: {
                                                image: item.picture, genre: [item.genre], progress: "0%",
                                                ratings: 7.5, runningTime: 123, age: true
                                            }
                                        }
                                    })

                                }>
                                <View key={index} style={{ backgroundColor: "rgba(30,30,30,1)", marginHorizontal: 20, marginBottom: 30, padding: 20, borderRadius: 25 }}>
                                    <Image
                                        style={{ width: '100%', height: 250, }}
                                        resizeMode='stretch'
                                        source={{ uri: item.picture }}
                                    />
                                    <Text style={{ color: "rgba(255, 0, 46,0.7)", marginTop:10, fontSize: 20, fontWeight: 'bold', flex: 1 }}>{item.name}</Text>
                                    <Text style={{ color: "rgba(255, 0, 46,0.7)", marginTop:10, fontSize: 15, fontWeight: 'bold', flex: 1 }}>Summary</Text>
                                    
                                    <Text style={{ color: 'rgba(255, 0, 46,0.7)',  fontSize: 15, paddingBottom: 20 }}>{item.summary}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ) : null
                    )
                }}
            />

        </View>
    );
};

export default AllMovies;

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
