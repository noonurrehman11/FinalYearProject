import storage from '@react-native-firebase/storage';
import { updateUser } from '../User';


export const submitImage = async (image, setUploading, setTransferred, setOpenModal, setImageUrl, editProfile,updateProfile) => {

    // const uploadUri= image
    console.log("sdad", setOpenModal)
    let filename = image.substring(image.lastIndexOf('/') + 1)
    const extension = filename.split('.').pop()
    const name = filename.split('.').slice(0, -1).join('.')
    filename = `${name}${Date.now()}.${extension}`
    // console.log("HELLLOOOO")

    const task = storage().ref(filename).putFile(image)
    task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100))
    });
    try {
        await task
        const url = await storage().ref(filename).getDownloadURL();
        console.log("Downloading url", url)
        if (editProfile) {
                await updateProfile(url)
                setTransferred(0)
                setUploading(false)
                setOpenModal(false)
        } else {
            setImageUrl(url)
            setTransferred(0)
            setUploading(false)
            setOpenModal(false)
        }
    }
    catch (e) {
        console.log(e)
        setTransferred(0)
        setUploading(false)
        setOpenModal(false)
    }

}
