import React from 'react'
import { Modal, StyleSheet, Text, View ,ActivityIndicator,StatusBar} from 'react-native'

const ModelLoader = () => {
    return (
        <Modal transparent={true}>
        
            <View style={styles.container}>
            <ActivityIndicator size="large" color="#FF002E"/>
            </View>
        </Modal>
    )
}

export default ModelLoader

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.6)",
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})
