import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FF002E"/>
            
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"black",
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})
