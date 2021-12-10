import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const flaskUrl = 'http://192.168.18.127:5000/';
// const nodeUrl = 'http://192.168.10.7:8000/'
const nodeUrl = 'https://desolate-escarpment-83964.herokuapp.com/';

export const getMovieDetail = async movieId => {
  const resp = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=166da265c1ef3c486182c1f7a73d0b8b&language=en-US`,
  );

  // console.log(resp.data)

  return {
    id: resp.data.id,
    name: resp.data.title,
    thumbnail: 'http://image.tmdb.org/t/p/w500/' + resp.data.poster_path,
    stillWatching: [
      {
        id: 1,
        // profile: require("../assets/images/dummy_profile/1.jpg")
      },
      {
        id: 2,
        // profile: require("../assets/images/dummy_profile/2.jpg")
      },
      {
        id: 3,
        // profile: require("../assets/images/dummy_profile/3.jpg")
      },
      {
        id: 4,
        // profile: require("../assets/images/dummy_profile/4.jpg")
      },
      {
        id: 5,
        // profile: require("../assets/images/dummy_profile/5.jpg")
      },
      {
        id: 6,
        // profile: require("../assets/images/dummy_profile/6.jpg")
      },
    ],
    details: {
      image: 'http://image.tmdb.org/t/p/w500/' + resp.data.poster_path,
      age: resp.data.adult,
      genre: resp.data.genres.map(data => data.name),
      ratings: resp.data.popularity,
      runningTime: resp.data.runtime,
      progress: '0%',
    },
  };
};

export const getRecommendedMovies = async movie => {
  try {
    const resp = await axios.post('http://192.168.1.95:5000/getMovie', {movie});
    return {success: true, data: resp.data};
  } catch (error) {
    return {success: false, error};
  }
};

export const getRandomMovies = async () => {
  const token = await fetchToken();
  try {
    const resp = await axios.get(nodeUrl + 'movie/random', {
      headers: {token: `Bearer ${token.accessToken}`},
    });
    // console.log(resp)
    return resp.data;
  } catch (error) {
    return {success: false, error};
  }
};

export const getMovieByName = async name => {
  const token = await fetchToken();
  try {
    const resp = await axios.get(nodeUrl + 'movie/name/' + name, {
      headers: {token: `Bearer ${token.accessToken}`},
    });
    // console.log(resp)
    return resp.data;
  } catch (error) {
    return {success: false, error};
  }
};

export const getMovies = async () => {
  const token = await fetchToken();
  try {
    const resp = await axios.get(nodeUrl + 'movie/getMovies', {
      headers: {token: `Bearer ${token.accessToken}`},
    });
    // console.log(resp)
    return resp.data;
  } catch (error) {
    return {success: false, error};
  }
};

export const requestMovie = async data => {
  const token = await fetchToken();
  try {
    const resp = await axios.post(
      nodeUrl + 'movieRequest/addMovieRequest',
      data,
      {headers: {token: `Bearer ${token.accessToken}`}},
    );
    // console.log(resp)
    return resp.data;
  } catch (error) {
    return {success: false, error};
  }
};

export const addMovieRecommendation = async data => {
  const token = await fetchToken();
  try {
    const resp = await axios.post(
      nodeUrl + 'recommendation/addRecommendation',
      data,
      {headers: {token: `Bearer ${token.accessToken}`}},
    );
    // console.log(resp)
    return resp.data;
  } catch (error) {
    return {success: false, error};
  }
};
export const getMovieRecommendation = async uid => {
  const token = await fetchToken();
  try {
    const resp = await axios.get(
      nodeUrl + 'recommendation/getRecommendation/' + uid,
      {headers: {token: `Bearer ${token.accessToken}`}},
    );
    // console.log(resp)
    return resp.data;
  } catch (error) {
    return {success: false, error};
  }
};

const fetchToken = async () => {
  const jsonValue = await AsyncStorage.getItem('data');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};
