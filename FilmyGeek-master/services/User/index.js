import axios from "axios";

// const url="http://192.168.18.128:8000/auth/"
const url = "https://desolate-escarpment-83964.herokuapp.com/users/"

export const updateUser = async (id,data) => {

    const resp = await axios.put(url + id, data)
    // console.log(resp.data)
    return resp.data
}

