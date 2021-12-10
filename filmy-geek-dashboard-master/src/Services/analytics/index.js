import axios from "axios";

const baseUrl = "https://desolate-escarpment-83964.herokuapp.com/analytic/";
export const getAnalytics =  () => {

    return axios.get(baseUrl + "getAnalytic");

}