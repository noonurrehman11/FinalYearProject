import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, icons, images, FONTS, SIZES, dummyData } from '../../constants';
import firestore from '@react-native-firebase/firestore';
import { getMovieByName, getMovieDetail, getMovieRecommendation, getMovies, getRandomMovies, getRecommendedMovies } from '../../services/Movies/Movie';
import ProgressBar from '../../components/ProgressBar';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addMoviesList } from '../../redux/MovieSlice';
import { getUsers } from '../../services/Friends';
import { addFriendsList, addUsersList } from '../../redux/UsersSlice';
import RequestModal from '../../components/RequestModal';
import { showmsg } from '../../components/ShowMsg';

const HomeScreen = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = useState([])
  const [moviesList, setMoviesList] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [receiveRequest, setReceiveRequest] = useState(false)
  const [acceptRequest, setAcceptRequest] = useState(false)
  const [receiveRequestData, setReceiveRequestData] = useState({})

  const [randomMovies, setRandomMovies] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])

  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return state.user.userInfo
  })
  const [friendsList, setFriendsList] = useState(useSelector(state => state.user.friendsList))

  useEffect(async () => {
    setLoading(true)
    const list = [1123, 65, 123, 66, 67]


    const rnd = await getRandomMovies()
    if (rnd.success) {
      // console.log('Random',rnd.results)
      setRandomMovies(rnd.results)
    } else {
      showmsg("Error getting random movies")
      console.log(rnd.error)
    }
    list.forEach(async (item) => {
      const movie = await getMovieDetail(item)
      // console.log(movie)
      data.push(movie)

      // movies.push(movie)
      // setMovies(movies)  
    })
    setMovies(data)
    const resp = await getMovies()
    if (resp.success) {
      setMoviesList(resp.results)
      dispatch(addMoviesList(resp.results))

    } else {
      console.log("Movies List fetch Error")
      showmsg(String(resp?.error))
      console.log(resp.error)
    }
    const users = await getUsers()
    // console.log(users)
    if (users.success) {
      // console.log("UserInfo",userInfo)
      // console.log("userssssss",users.results.filter(item => item.username !== userInfo.username))
      dispatch(addUsersList(users.results.filter(item => item.username !== userInfo.username)))
    }
    else {
      console.log("Users List fetch Error")
      showmsg(String(resp?.error))
      console.log(users.error)
    }
    firestore().collection('friends')
      .doc(userInfo._id).collection('list')
      .onSnapshot(snapshot => {
        console.log("Friendsssss", snapshot.empty)
        if (!snapshot.empty) {
          dispatch(addFriendsList(snapshot.docs.map(doc => doc.data())))
          setFriendsList(snapshot.docs.map(doc => doc.data()))
          const friends = snapshot.docs.map(doc => doc.data())
          friends.forEach(async (item) => {
            console.log("Friend", item.id)
            getMovieRecommendation(item.id).then(resp => {
              if (resp.success) {
                // setRecommendedMovies(resp.results)
                if (resp.results.length > 0) {

                  setRecommendedMovies(...recommendedMovies, resp.results)
                  console.log("object", recommendedMovies)
                }
              } else {
                console.log("Recommendation fetch Error")
                showmsg(String(resp?.error))
                console.log(resp.error)
              }
            })
              .catch(err => {
                showmsg("Error getting friend movie recommendation")
                console.log(err)
              })


          })

        } else {
          dispatch(addFriendsList([]))
          setFriendsList([])
        }
        setLoading(false)
      },
        error => {
          console.log(error)
          setLoading(false)
          showmsg("Error while fetching friends")

        })
    firestore().collection('roomRequest')
      .doc(userInfo._id)
      .onSnapshot(snapshot => {
        console.log("Rooms Request", snapshot.exists)
        if (snapshot.exists) {
          // console.log("Room Request Data",snapshot.data())
          setReceiveRequestData({ ...snapshot.data(), id: snapshot.id })
          setReceiveRequest(true)
          // set
        }
        setLoading(false)
      },
        error => {
          console.log(error)
          setLoading(false)
          showmsg("Error to listen room requests")

        })

    setLoading(false)

    setData([])
    // console.log(getMovies())
    // getRecommendedMovies()
    // return ()=>{
    //   console.log("unmount")
    //   setMovies([])

    // } 
    console.log("Movies", recommendedMovies)
  }, [])
  if (loading) {
    return <Loader />
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Profile */}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            // console.log('Open Drawer')
            navigation.toggleDrawer()
          }
          }>
          <MaterialCommunityIcons name="menu" color="white" size={35} />
        </TouchableOpacity>
        {/* Search */}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            navigation.navigate('SearchScreen')
          }}>
          <Image
            source={icons.search}
            style={{ width: 25, height: 25, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>

      </View>
    );
  }
  function renderNewSeasonSection() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{ marginTop: SIZES.radius }}
        data={randomMovies}
        keyExtractor={item => `${item._id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('MovieDetail', {
                  movie: item,
                })
              }>
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* Thumbnail */}
                <ImageBackground
                  source={{ uri: item.picture }}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width * 0.85,
                    height: SIZES.height * 0.45,
                    justifyContent: 'flex-end',
                  }}
                  imageStyle={{
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      height: 60,
                      marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                    }}>
                    {/* playNowsection */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: COLORS.transparentWhite,
                        }}>
                        <Image
                          resizeMode="contain"
                          source={icons.play}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginLeft: SIZES.base,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}>
                        Play Now
                      </Text>
                    </View>
                    {/* Still Watching */}
                    {/* {item.stillWatching.length > 0 && (
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                          Still Watching
                        </Text>
                      </View>
                    )} */}
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }
  function renderDots() {
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {dummyData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  }

  function renderFriendsSection() {
    if (recommendedMovies.length > 0) {
      return (
        <View style={{ marginTop: SIZES.padding }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
              Recommended Movies By Friends
            </Text>
            {/* <Image
              source={icons.right_arrow}
              style={{ width: 20, height: 20, tintColor: COLORS.primary }}
            /> */}
          </View>
          {/* List */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: SIZES.padding }}
            data={recommendedMovies}
            keyExtractor={item => `${item._id}`}
            renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={async () => {
                    const resp = await getMovieByName(item.movieName)
                    if(resp.success){
                      if(resp.results.length>0){
                          // console.log(resp.results[0])
                          navigation.navigate('MovieDetail',{movie:resp.results[0]})
                      } else{
                          showmsg('movie not found in db')
                      }
                  } else{
                      showmsg('Error to load movie from db')
                  }
                    // navigation.navigate('MovieDetail', { selectedMovie: item })
                  }
                  }>
                  <View
                    style={{
                      marginLeft: index == 0 ? SIZES.padding : 20,
                      marginRight:

                        SIZES.padding

                    }}>
                    {/* thumbnail */}
                    <Image
                      source={{ uri: item.picture }}
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
                      {item.movieName}
                    </Text>
                    <Text
                      style={{
                        marginTop: SIZES.base,
                        color: COLORS.white,
                        ...FONTS.h4,
                      }}>
                      {`By: ${item.userName}`}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{ marginTop: SIZES.padding }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
              Recommended Movies By Friends
            </Text>
            {/* <Image
              source={icons.right_arrow}
              style={{ width: 20, height: 20, tintColor: COLORS.primary }}
            /> */}
          </View>
          {/* List */}

        </View>
      );
    }
  }
  function renderContinueWatchingSection() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}>
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Continue Watching
          </Text>
          <Image
            source={icons.right_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.primary }}
          />
        </View>
        {/* List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.padding }}
          data={dummyData.continueWatching}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('MovieDetail', { selectedMovie: item })
                }>
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight:
                      index == dummyData.continueWatching.length - 1
                        ? SIZES.padding
                        : 0,
                  }}>
                  {/* thumbnail */}
                  <Image
                    source={item.thumbnail}
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
                    {item.name}
                  </Text>
                  {/* ProgressBar  */}
                  <ProgressBar
                    containerStyle={{ marginTop: SIZES.radius }}
                    barStyle={{ height: 3 }}
                    barPercentage={item.overallProgress}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
  function renderCategorySection() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}>
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            All Movies
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllMovies')}
            activeOpacity={0.8}
          >
            <Image
              source={icons.right_arrow}
              style={{ width: 20, height: 20, tintColor: COLORS.primary }}
            />
          </TouchableOpacity>
        </View>
        {/* List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.padding }}
          data={moviesList}
          keyExtractor={item => `${item._id}`}
          renderItem={({ item, index }) => {
            return (
              item.status ? (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('MovieDetail', {
                      movie: item,
                    })

                  }>
                  <View
                    style={{
                      marginLeft: index == 0 ? SIZES.padding : 20,
                      marginRight:
                        index == dummyData.continueWatching.length - 1
                          ? SIZES.padding
                          : 0,
                    }}>
                    {/* thumbnail */}
                    <Image
                      source={{ uri: item.picture }}
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
                      {item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : null
            )
          }}
        />
      </View>
    );
  }

  const accept = () => {
    console.log("Accept Request", receiveRequestData)
    firestore().collection('rooms').doc(receiveRequestData.roomId).get()
      .then((doc) => {
        console.log("Request Accepted", { ...doc.data(), id: doc.id })
        firestore().collection('roomRequest').doc(receiveRequestData.id).delete()
          .then(() => {
            console.log("Request Deleted")
            navigation.navigate('MovieRoom', { roomData: { ...receiveRequestData }, setAcceptRequest })
            setAcceptRequest(true)
            setReceiveRequest(false)
            // setReceiveRequestData({})
            // setReceiveRequest(false)

          })
          .catch(err => {
            console.log("Error", err)
            showmsg('Unable to accept request')
          })
      })
      .catch(err => {
        console.log("Error", err)
        showmsg('Unable to accept request')
      })

  }

  const ignore = () => {
    // console.log("Ignore Request",receiveRequestData)
    firestore().collection('roomRequest').doc(receiveRequestData.id).delete()
      .then(() => {
        console.log("Request Deleted")
        setReceiveRequestData({})
        setReceiveRequest(false)

      })
      .catch(err => {
        console.log("Error", err)
        showmsg('Unable to ignore request')
      })
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <StatusBar hidden={true} />
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {renderNewSeasonSection()}
        {renderDots()}
        {renderFriendsSection()}
        {/* {renderContinueWatchingSection()} */}
        {renderCategorySection()}
      </ScrollView>
      {
        (receiveRequest && !acceptRequest)
          ?
          <RequestModal accept={accept} ignore={ignore} receiveRequestData={receiveRequestData} />
          : null
      }
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
