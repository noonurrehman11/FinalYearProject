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
import * as CONSTANTS from '../../constant/constant.js';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { requestMovie } from '../../services/Movies/Movie.js';
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES } from '../../constants/theme.js';
import { showmsg } from '../../components/ShowMsg.js';
import { useSelector } from 'react-redux';
import ModelLoader from '../../components/ModelLoader.js';
import { login } from '../../services/Auth/auth.js';
import { updateUser } from '../../services/User/index.js';

const EditPassword = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    // const movie=route.params.movie;
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })



    const update = async () => {

        if (oldPassword.length !== 0 && newPassword.length !== 0) {
            if (newPassword.length >= 6) {
                setLoading(true)
                const resp = await login({ email: userInfo.email, password: oldPassword })
                if (resp.success) {
                    const res= await updateUser(userInfo._id,{password:newPassword})
                    if(res.success){
                        console.log(res)
                        setOldPassword('')
                        setNewPassword('')
                        showmsg("Password updated")
                        setLoading(false)
                        navigation.goBack()
                    } else{
                        setLoading(false)
                    }
                } else {
                    setLoading(false)
                    showmsg('Please enter correct password to change password')
                }
            } else {

                showmsg('Password must be at least 6 characters long')
            }
        } else {

            showmsg('Please enter all fields')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: 'rgba(255, 0, 46,0.7)', fontSize: 25, fontWeight: 'bold' }}>Enter Old Password</Text>
            <TextInput
                style={{ alignSelf: 'flex-start', borderBottomColor: 'rgba(255, 0, 46,0.7)', borderBottomWidth: 1, marginTop: 10, width: '100%' }}
                placeholder="Enter Password Name"
                placeholderTextColor='#fff'
                onChangeText={setOldPassword}
                value={oldPassword}
                secureTextEntry={true}
            />
            <Text style={{ color: 'rgba(255, 0, 46,0.7)', fontSize: 25, fontWeight: 'bold' }}>Enter New Password</Text>
            <TextInput
                style={{ alignSelf: 'flex-start', borderBottomColor: 'rgba(255, 0, 46,0.7)', borderBottomWidth: 1, marginTop: 10, width: '100%' }}
                placeholder="Enter Password Name"
                placeholderTextColor='#fff'
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity style={{ backgroundColor: 'rgba(255, 0, 46,0.7)', marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
                onPress={update}
            >
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Update Password</Text>
            </TouchableOpacity>
            {loading && <ModelLoader />}
        </View>
    );
};

export default EditPassword;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        display: 'flex',
        paddingHorizontal: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
