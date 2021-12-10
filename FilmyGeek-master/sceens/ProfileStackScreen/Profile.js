import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { icons } from '../../constants';
import CameraModel from '../../components/CameraModel';
import { updateUser } from '../../services/User';
import { showmsg } from '../../components/ShowMsg';
import { addUserInfo } from '../../redux/UsersSlice';

const { width } = Dimensions.get('window');


export default function Profile({ navigation }) {
    const userInfo = useSelector(state => {
        return state.user.userInfo
    })
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [imageUrl, setImageUrl] = useState(false)

    const updateProfile = async (url) => {
        const resp = await updateUser(userInfo._id, { photo: url })
        console.log("Update rep", resp)
        if (resp.success) {
            dispatch(addUserInfo({ ...userInfo, photo: url }))
            showmsg("Profile picture updated")
        }
    }

    return (
        <View style={styles.container}>
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
                            color: 'rgba(255, 0, 46,0.7)',
                            marginBottom: 10,
                            fontSize: 30,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: width - 100,

                        },
                    ]}>
                    Profile
                </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{
                        width: 180,
                        height: 180,
                        borderRadius: 90,
                    }}
                    source={{
                        uri: userInfo?.photo
                    }}
                />
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 25, color: 'rgba(255, 0, 46,0.7)' }}>
                    {userInfo.username}
                </Text>
            </View>
            <View style={{ backgroundColor: "rgba(30,30,30,1)", marginHorizontal: 30, marginBottom: 30, padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: "rgba(255, 0, 46,0.7)", fontSize: 25, fontWeight: 'bold' }}>Edit Profile Pic</Text>
                <TouchableOpacity onPress={() => { setOpenModal(true) }}>
                    <Image
                        style={{ width: 25, height: 25, tintColor: 'rgba(255, 0, 46,0.7)' }}
                        source={icons.right_arrow}
                    />
                </TouchableOpacity>

            </View>
            <View style={{ backgroundColor: "rgba(30,30,30,1)", marginHorizontal: 30, marginBottom: 30, padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: "rgba(255, 0, 46,0.7)", fontSize: 25, fontWeight: 'bold' }}>Change Password</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('EditPasswordScreen')
                }}>
                    <Image
                        style={{ width: 25, height: 25, tintColor: 'rgba(255, 0, 46,0.7)' }}
                        source={icons.right_arrow}
                    />
                </TouchableOpacity>
            </View>
        
            {openModal && (
                <CameraModel
                    setOpenModal={setOpenModal}
                    editProfile={true}
                    closeModel={() => { setOpenModal(false) }}
                    setImageUrl={setImageUrl}
                    updateProfile={updateProfile}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },

});