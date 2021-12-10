import axios from "axios";

// const url="http://192.168.18.128:8000/auth/"
const url = "https://desolate-escarpment-83964.herokuapp.com/auth/"


export const login = async (data) => {

    try {
        const resp = await axios.post(url + "login", data)
        // console.log(resp.data)
        return resp.data
    } catch (error) {
        return { success: false, error: "Network Error" }
    }
}