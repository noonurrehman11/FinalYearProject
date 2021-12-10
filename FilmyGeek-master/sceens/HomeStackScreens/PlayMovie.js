import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('screen');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {
  getMovieByName,
  getRecommendedMovies,
} from '../../services/Movies/Movie';
import {showmsg} from '../../components/ShowMsg';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../constants';
// import * as CONSTANT from '../constant/constant.js';
// import * as Progress from 'react-native-progress';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PlayMovie = ({navigation, route}) => {
  const [roomData, setRoomData] = useState({});

  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => {
    return state.user.userInfo;
  });

  // const code = route.params.code;
  const movie = route.params.movie;
  // console.log("Movie", movie)

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedMoviesPosters, setRecommendedMoviesPosters] = useState([]);

  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'contain') setScreenType('cover');
    else setScreenType('contain');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  function RenderFriendsSection() {
    return (
      <View style={{marginTop: SIZES.padding}}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}>
          <Text style={{flex: 1, color: COLORS.white, ...FONTS.h2}}>
            Recommended Movies
          </Text>
          <Image
            source={icons.right_arrow}
            style={{width: 20, height: 20, tintColor: COLORS.primary}}
          />
        </View>
        {/* List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginTop: SIZES.padding}}
          data={recommendedMovies}
          keyExtractor={item => `${item}`}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback
                onPress={
                  async () => {
                    console.log('check movie', item);
                    const resp = await getMovieByName(item);
                    // console.log("check movie",resp)
                    if (resp.success) {
                      if (resp.results.length > 0) {
                        console.log(resp.results[0]);
                        navigation.navigate('MovieDetail', {
                          movie: resp.results[0],
                        });
                      } else {
                        showmsg('movie not found in db');
                      }
                    } else {
                      showmsg('Error to load movie from db');
                    }
                  }
                  // navigation.navigate('MovieDetail', { selectedMovie: item })
                }>
                <View
                  style={{
                    marginLeft: 40,
                    marginRight: 30,
                  }}>
                  {/* thumbnail */}
                  <Image
                    source={{uri: recommendedMoviesPosters[index]}}
                    style={{
                      width: SIZES.width / 3,
                      height: SIZES.width / 3 + 60,
                      borderRadius: 20,
                    }}
                  />
                  {/* Name */}
                  <Text
                    style={{
                      marginTop: SIZES.base,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
      headerShown: false,
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('Back button pressed');
      setShowModal(true);
      return true;
    });
  }, []);

  useEffect(async () => {
    setLoading(true);
    if (movie.isHollywood) {
      console.log('Get Recommendation');
      const resp = await getRecommendedMovies(movie.name);
      if (resp.success) {
        console.log('Reccomendationnnn', resp.data.movie);
        setRecommendedMovies(resp.data.movie);
        setRecommendedMoviesPosters(resp.data.poster);
      } else {
        showmsg('Recommendation server error ');
      }
    }
    setLoading(false);
  }, [movie]);
  // console.log('Moviesssss',recommendedMovies)
  // console.log('Posterss',recommendedMoviesPosters)

  // console.log("CHATS", chat)

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight onPress={() => {}}>
          <Text></Text>
        </TouchableHighlight>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingLeft: 25,
            }}>
            Movie
          </Text>
        </View>
        {/* <Text style={styles.name}>{route.params.title}</Text> */}

        <TouchableHighlight
          underlayColor="rgba(255,255,255,0.2)"
          onPress={() => {
            setShowModal(true);
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="exit-outline" color="white" size={30} />
        </TouchableHighlight>
      </View>
      <View style={{flex: 1}}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          source={{
            uri: movie.movieLink,
          }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        />
      </View>

      {movie.isHollywood ? <RenderFriendsSection /> : null}
      {showModal ? (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you want to exit movie?</Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  // setAcceptRequest(false)
                  setShowModal(false);
                  navigation.goBack();
                }}>
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default PlayMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    width,
    height: 80,
    backgroundColor: 'rgba(255, 0, 46,0.7)',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  profile: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    color: 'white',
    marginLeft: 8,
  },
  chattingWrapper: {
    height: height - 450,
    width,
    paddingLeft: 20,
    paddingRight: 20,
    maxHeight: height - 450,
  },
  othersChat: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: 'rgba(255, 0, 46,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  mineChat: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(255, 0, 46,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  username: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  time: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.6)',
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 35,
  },

  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#f2f2f2',
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: 'rgba(255, 0, 46,0.7)',
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
