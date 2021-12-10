import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { submitImage } from '../services/Storage';


export const openGallery = (setUploading, setImageUrl, setTransferred, setOpenModal, editProfile,updateProfile) => {
    ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true
    }).then(image => {
        // console.log(image);
        if (Platform.OS === 'ios') {
            // setImage(image.sourcePath);
            setUploading(true)
            submitImage(image.sourcePath, setUploading, setTransferred, setOpenModal, setImageUrl, editProfile,updateProfile)
        }
        else {
            setUploading(true)
            submitImage(image.path, setUploading, setTransferred, setOpenModal, setImageUrl, editProfile,updateProfile)
        }

    })
        .catch(err => {
            console.log("Gallery Error",err)
            setUploading(false)
            setOpenModal(false)
        })
}
export const openCamera = (setUploading, setImageUrl, setTransferred, setOpenModal, editProfile, updateProfile) => {
    ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
    }).then(image => {
        // console.log(image);
        if (Platform.OS === 'ios') {
            setUploading(true)
            submitImage(image.sourcePath, setUploading, setTransferred, setOpenModal, setImageUrl, editProfile,updateProfile)
        }
        else {
            setUploading(true)
            submitImage(image.path,setUploading, setTransferred, setOpenModal, setImageUrl, editProfile,updateProfile)
        }
        setOpenModel(false);
    })
        .catch(err => {
            console.log("Camera Error",err)
            setUploading(false)
            setOpenModal(false)
        })
}

