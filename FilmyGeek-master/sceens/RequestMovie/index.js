import React, { useState } from 'react';
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
    AlertIOS
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { requestMovie } from '../../services/Movies/Movie.js';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ModelLoader from '../../components/ModelLoader';

const RequestMovie = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })
    let requestSchema = yup.object().shape({
        movieName: yup.string().required('Please enter movie name'),
        details: yup.string().required('Please enter movie details'),
        release_Date: yup.date().required('Please select movie release date'),
        cast: yup.string().required('Please enter cast')
    });
    const showmsg = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    };
    const onChanged = (event, selectedDate, handleChange) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        handleChange('release_Date')(new Date(currentDate).toISOString().split('T')[0])
    };

    return (
        <Formik
            initialValues={{
                movieName: '',
                details: '',
                release_Date: '',
                cast: '',
            }}
            validationSchema={requestSchema}
            onSubmit={(values, { resetForm }) => {
                setLoading(true);
                // console.log({ ...values, userName: userInfo.username })
                requestMovie({ ...values, userName: userInfo.username })
                    .then((resp) => {
                        if (resp.success) {
                            setLoading(false);
                            showmsg("Movie Request has been send successfully")
                            resetForm()
                        } else {
                            setLoading(false);
                            showmsg(resp?.error)
                        }
                    })
                    .catch(error => {
                        setLoading(false);
                        showmsg('Unable to submit your movie request')
                        console.log(error)
                    })




            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ImageBackground
                    source={require('./../../Images/SplashBG.png')}
                    style={
                        (styles.container, { width: '100%', height: '100%', resizeMode: '' })
                    }>


                    <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 50,
                                    height: 50,
                                }}
                                onPress={() => {
                                    // console.log('Open Drawer')
                                    navigation.toggleDrawer()
                                }
                                }>
                                <MaterialCommunityIcons name="menu" color="white" size={35} />
                            </TouchableOpacity>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: 'orange',
                                    },
                                ]}>
                                Request a Movie
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Movie name
                        </Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter a Movie name"
                                placeholderTextColor="#666666"
                                onBlur={handleBlur('movieName')}
                                style={[
                                    styles.textInput,
                                    {
                                        color: '#fff',
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={handleChange('movieName')}
                                value={values.movieName}
                            />
                        </View>
                        {(errors.movieName && touched.movieName) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{errors.movieName}</Text>
                            </Animatable.View>
                        )}
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Cast
                        </Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter Movie Cast Name"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: '#fff',
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={handleChange('cast')}
                                onBlur={handleBlur('cast')}
                                value={values.cast}
                            />
                        </View>
                        {(errors.cast && touched.cast) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{errors.cast}</Text>
                            </Animatable.View>
                        )}
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Release date

                        </Text>
                        <View style={{ ...styles.action, display: 'flex', justifyContent: 'space-between' }}>
                            <Text style={{ color: "#fff" }}>{values.release_Date}</Text>
                            <TouchableOpacity onPress={() => { setShow(true) }}>
                                <AntDesign name="calendar" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='datetime'
                                is24Hour={true}
                                display="default"
                                onChange={(event, selectedDate) => { onChanged(event, selectedDate, handleChange) }}
                            />
                        )}
                        {(errors.release_Date && touched.release_Date) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{errors.release_Date}</Text>
                            </Animatable.View>
                        )}
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Details
                        </Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter Movie Details"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: '#fff',
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={handleChange('details')}
                                onBlur={handleBlur('details')}
                                value={values.details}
                            />
                        </View>
                        {(errors.details && touched.details) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{errors.details}</Text>
                            </Animatable.View>
                        )}
                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <LinearGradient
                                    colors={['red', '#000', 'red']}
                                    style={styles.signIn}>
                                    <Text style={styles.textSign}>Request</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {loading? <ModelLoader/>:null}
                    </Animatable.View>
                </ImageBackground>
            )}

        </Formik>
    );
};

export default RequestMovie;

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
    textInput: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
        padding: 15,
        paddingLeft: 35,
        paddingRight: 35,
        color: '#fff',
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 30,
    },
    text: {
        color: '#000',
        marginTop: 5,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 40,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
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
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
