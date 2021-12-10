import axios from "axios";

const baseUrl = "https://desolate-escarpment-83964.herokuapp.com/complaint/";
export const getComplaints =  () => {

    return axios.get(baseUrl + "getComplaints");

}


export const deleteComplaint =  (id) => {

    return axios.delete(baseUrl + `deleteComplaint/${id}`);

}

