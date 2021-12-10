import axios from "axios";

const baseUrl = "https://desolate-escarpment-83964.herokuapp.com/users/";
export const getUsers = async () => {

    try {
        const resp = await axios.get(baseUrl + "");
        return resp.data
    } catch (error) {
        return { success: false, error: error }
    }

}
export const updateUser = (id,data) => {

    return axios.put(baseUrl +`${id}`,data);

}

export const deleteUser = (id) => {

    return axios.delete(baseUrl + `${id}`);

}


