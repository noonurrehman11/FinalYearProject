import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// const flaskUrl = 'http://127.0.0.1:5000/'
// const nodeUrl = 'http://192.168.10.7:8000/'
const nodeUrl = 'https://desolate-escarpment-83964.herokuapp.com/'


export const addPost = async (data) => {

    const token = await fetchToken()
    try {
        const resp = await axios.post(nodeUrl + "post/addPost", data, { headers: { token: `Bearer ${token.accessToken}` } })
        // console.log(resp)
        if (resp?.data?.error?.code === 11000) {
            // console.log("PUTT",data)
            const putResp = await axios.put(nodeUrl + `post/addPost/${data._id}`, {post:data.posts}, { headers: { token: `Bearer ${token.accessToken}` } })
            return putResp.data
        } else {
            return resp.data
        }
    } catch (error) {
        console.log('AddPost', error)
    }
}

export const getPost = async (id) => {

    const token = await fetchToken()
    try {
        const resp = await axios.get(nodeUrl + `post/${id}`, { headers: { token: `Bearer ${token.accessToken}` } })
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