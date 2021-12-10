import axios from "axios";

const baseUrl = "https://desolate-escarpment-83964.herokuapp.com/movieRequest/";
export const getMovieRequest =  () => {

    return axios.get(baseUrl + "requestMovies");

}


export const deleteMovieRequest =  (id) => {

    return axios.delete(baseUrl + `deleteMovieRequest/${id}`);

}

