
import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loggedIn, resetLogin } from '../../redux/LoginSlice';
import { resetUser } from '../../redux/UsersSlice';
import { resetMovie } from '../../redux/MovieSlice';

const CustomDrawerMenu = (props) => {
    
    const dispatch=useDispatch()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black", }}>
            {/*Top Large Image */}
            <Image
                source={require('../../Images/Logo.png')}
                style={styles.sideMenuProfileIcon}
            />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    onPress={async () => {
                        await AsyncStorage.removeItem('data');
                        dispatch(resetUser())
                        dispatch(resetMovie())
                        dispatch(loggedIn(false))
                    }}
                    labelStyle={{ color: "white",fontSize: 20, fontWeight: 'bold', }}

                />
                {/* <DrawerItem
                    label="Visit Us"
                    onPress={() => Linking.openURL('https://aboutreact.com/')}
                />
                <View style={styles.customItem}>
                    <Text
                        onPress={() => {
                            Linking.openURL('https://aboutreact.com/');
                        }}>
                        Rate Us
                    </Text>
                    <Image
                        source={{ uri: BASE_PATH + 'star_filled.png' }}
                        style={styles.iconStyle}
                    />
                </View> */}
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'cover',
        width: 200,
        height: 100,
        // borderRadius: 100 / 2,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomDrawerMenu;