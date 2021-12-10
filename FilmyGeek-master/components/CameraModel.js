import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import { openCamera, openGallery } from '../utils/Camera'



const CameraModel = ({
    // imgUrl,
    editProfile=false,
    setImageUrl,
    setOpenModal,
    closeModel,
    updateProfile,
    // ...props
}) => {
    const [image, setImage] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [selected, setSelected] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)
    
    // console.log("Modal",setOpenModal )
    return (
        <Modal transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalView}>
                    {!uploading?
                    <>
                    <Text style={styles.modalText}>Choose Upload Method</Text>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={()=>{openCamera(setUploading,setImageUrl,setTransferred,setOpenModal,editProfile,updateProfile)}}
                    >
                        <Text style={styles.textStyle}>Open Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={()=>{openGallery(setUploading,setImageUrl,setTransferred,setOpenModal,editProfile,updateProfile)}}
                    >
                        <Text style={styles.textStyle}>Open Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={closeModel}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                    </>
                    :
                    <>
                    <ActivityIndicator size="large" color="rgba(255, 0, 46,0.7)" />
                    <Text style={{...styles.modalText,color:'rgba(255, 0, 46,0.7)'}}>Uploading is {transferred}% done</Text>
                    
                    </>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default CameraModel

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        // margin: 20,
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 35,

    },

    modalText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center",
        color: '#f2f2f2',

    },
    textStyle:{
        color: '#fff',fontSize: 15, fontWeight: 'bold',textAlign:'center' 
    },
    buttonStyle:{
        backgroundColor: 'rgba(255, 0, 46,0.7)', marginTop: 25, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 
    }
})
