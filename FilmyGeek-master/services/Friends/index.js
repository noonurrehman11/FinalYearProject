import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
const flaskUrl = 'http://127.0.0.1:5000/'
// const nodeUrl = 'http://192.168.10.7:8000/'
const nodeUrl = 'https://desolate-escarpment-83964.herokuapp.com/'


export const getUsers = async () => {
    const token = await fetchToken()
    try {
        const resp = await axios.get(nodeUrl + "users/", { headers: { token: `Bearer ${token.accessToken}` } })
        // console.log("Users",resp.data)
        return resp.data

    } catch (error) {
        return { success: false, error }
    }

}



export const getFriends = async (id) => {

    return firestore().collection('friends')
        .doc(id).collection('list')
        

}
export const sendRequest = async (id,data,reqId) => {

    return firestore().collection('friendRequests')
        .doc(id).collection('requests').doc(reqId).set(data)
        

}
export const checkRequestExists = async (id,reqId) => {
    return firestore().collection('friendRequests')
        .doc(id).collection('requests').doc(reqId).get()
}

export const sendAdminMessage = (id, message) => {
    return firestore().collection('chats').doc(id).collection('messages').add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        ...message
    })
}

export const getRecommendedMovies = async () => {
    const resp = await axios.post("http://127.0.0.1:5000/getMovie", { movie: "Avatar" })
    console.log("Recommended ", resp)

}

export const getMovies = async () => {

    const token = await fetchToken()
    try {
        const resp = await axios.get(nodeUrl + "movie/getMovies", { headers: { token: `Bearer ${token.accessToken}` } })
        // console.log(resp)
        return resp.data

    } catch (error) {
        return { success: false, error }
    }


}

export const requestMovie = async (data) => {

    const token = await fetchToken()
    try {
        const resp = await axios.post(nodeUrl + "movieRequest/addMovieRequest", data, { headers: { token: `Bearer ${token.accessToken}` } })
        // console.log(resp)
        return resp.data

    } catch (error) {
        return { success: false, error }
    }


}

const fetchToken = async () => {
    const jsonValue = await AsyncStorage.getItem('data')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}