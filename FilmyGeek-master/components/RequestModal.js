import React from 'react'
import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native'

const RequestModal = ({
    accept,
    ignore,
    receiveRequestData,
    
}) => {
    return (
        <Modal transparent >
            <View style={styles.container}>

                <View style={styles.movieContainer}>
                    <Text style={styles.header}>Room Join request</Text>
                    <Text style={{...styles.text,fontSize:16,paddingBottom:10}}> {`Movie Name: ${receiveRequestData.movie}`} </Text>
                    <Text style={styles.text}> {`${receiveRequestData.owner} wants you to join room ${receiveRequestData.roomName}`} </Text>
                    <TouchableOpacity style={styles.button}
                        onPress={accept}
                    >
                        <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={ignore}
                    >
                        <Text style={styles.buttonText}>Ignore</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

export default RequestModal

const styles = StyleSheet.create({
    container:{alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)'},
    movieContainer: { backgroundColor: "rgba(30,30,30,0.8)", padding: 25, borderRadius: 20, marginHorizontal: 30 },
    header:{ color: 'rgba(255, 0, 46,0.7)', fontWeight: 'bold', fontSize: 25, textAlign: 'center',paddingBottom:10 },
    text:{ color: 'rgba(255, 0, 46,0.7)', fontWeight: 'bold', fontSize: 20, textAlign: 'center' },
    button:{ backgroundColor: 'rgba(255, 0, 46,0.7)', marginHorizontal: 70, marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
    buttonText:{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }

})
