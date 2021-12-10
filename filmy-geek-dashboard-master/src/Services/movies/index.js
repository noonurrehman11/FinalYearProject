import axios from "axios";

const baseUrl = "https://desolate-escarpment-83964.herokuapp.com/movie/";
export const getMovies =  () => {

    return axios.get(baseUrl + "getMovies");

}
export const getMovieById =  (id) => {

    return axios.get(baseUrl + `getMovies/${id}`);

}

export const addMovie =  (data) => {

    return axios.post(baseUrl + "addMovie",data);

}

export const updateMovieById =  (id,data) => {

    return axios.put(baseUrl + `updateMovie/${id}`,data);

}

export const deleteMovie =  (id) => {

    return axios.delete(baseUrl + `deleteMovie/${id}`);

}