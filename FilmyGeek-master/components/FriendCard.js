import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
const FriendCard = ({
    request = false,
    onAccept,
    onReject,
    onDelete,
    data
}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri:data.photo}} style={{ width: 80, height: 80, borderRadius: 40 }} />
            <Text style={styles.text}>{data.username}</Text>
            {request ?
                <>
                    <TouchableOpacity onPress={()=>{onAccept(data)}}>
                        {/* <Entypo name="cross" size={30} color="#fff" /> */}
                        <Entypo name="check" color='#fff' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onReject(data)}}>
                        {/* <Entypo name="cross" size={30} color="#fff" /> */}
                        <Entypo name="cross" color='#fff' size={30} />
                    </TouchableOpacity>
                </>
                :
                <TouchableOpacity onPress={()=>{onDelete(data)}}>
                {/* <Entypo name="cross" size={30} color="#fff" /> */}
                <AntDesign name="deleteuser" color='#fff' size={30} />
            </TouchableOpacity>
            
            }
        </View>
    )
}

export default FriendCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 46,0.7)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        padding: 10
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 20,
        flex: 1
    },

})
