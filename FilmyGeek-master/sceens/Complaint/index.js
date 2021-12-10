import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    TextInput,
    ImageBackground,
    Platform,
    ToastAndroid,
    AlertIOS
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import ModelLoader from '../../components/ModelLoader.js';
import { reportProblem } from '../../services/Complaint/index.js';

const Complaint = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector(state => {
        return state.user.userInfo
    })

    let problemSchema = yup.object().shape({
        subject: yup.string().required('Please enter subject'),
        detail: yup.string().required('Please enter problem detail'),
    });
    const showmsg = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    };

    return (
        <Formik
            initialValues={{
                subject: '',
                detail: '',

            }}
            validationSchema={problemSchema}
            onSubmit={(values, { resetForm }) => {
                setLoading(true);
                reportProblem({ ...values, userName: userInfo.username })
                    .then((resp) => {
                        if (resp.success) {
                            setLoading(false);
                            showmsg("Your complaint has been submit successfully")
                            resetForm()
                        } else {
                            setLoading(false);

                            showmsg(resp?.error)
                        }
                    })
                    .catch(error => {
                        setLoading(false);
                        showmsg('Unable to submit your complaint')
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
                                Request A Problem
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Problem Subject
                        </Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter Subject"
                                placeholderTextColor="#666666"
                                onBlur={handleBlur('subject')}
                                style={[
                                    styles.textInput,
                                    {
                                        color: '#fff',
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={handleChange('subject')}
                                value={values.subject}
                            />
                        </View>
                        {(errors.subject && touched.subject) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{errors.subject}</Text>
                            </Animatable.View>
                        )}
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    color: '#fff',
                                },
                            ]}>
                            Problem Detail
                        </Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter Detail"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: '#fff',
                                    },
                                ]}
                                autoCapitalize="none"
                                multiline={true}
                                numberOfLines={8}
                                onChangeText={handleChange('detail')}
                                onBlur={handleBlur('detail')}
                                value={values.detail}
                            />
                        </View>
                        {(errors.detail && touched.detail) && (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{errors.detail}</Text>
                            </Animatable.View>
                        )}

                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <LinearGradient
                                    colors={['red', '#000', 'red']}
                                    style={styles.signIn}>
                                    <Text style={styles.textSign}>Report</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {loading ? <ModelLoader /> : null}
                    </Animatable.View>
                </ImageBackground>
            )}

        </Formik>
    );
};

export default Complaint;

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
