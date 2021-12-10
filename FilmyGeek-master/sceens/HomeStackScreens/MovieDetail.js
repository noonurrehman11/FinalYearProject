import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, icons, FONTS, SIZES } from '../../constants';
import ProgressBar from '../../components/ProgressBar';

const MovieDetail = ({ navigation, route }) => {
  const { movie } = route.params;
  const { width, height } = Dimensions.get('window');

  // console.log("Params",route.params);

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Back */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.left_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
        {/* Share */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => console.log('Share Movie')}>
          <Image
            source={icons.upload}
            style={{ width: 25, height: 25, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderHeaderSection() {
    return (
      <ImageBackground
        source={{ uri: movie.picture }}
        resizeMode="cover"
        style={{
          width: '100%',
          height: height * 0.6,
        }}>
        {renderHeaderBar()}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['transparent', '#000']}
            style={{
              width: '100%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {/* season */}
            {/* <Text style={{color: COLORS.white, ...FONTS.body4}}>
              {selectedMovie?.details.season}
            </Text> */}
            {/* Name */}
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.h1,
              }}>
              {movie.name}
            </Text>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }
  function renderCategoryAndRating() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.base,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* Age */}
        <View style={[styles.categoryContainer, { marginLeft: 0 }]}>
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            Adult: {String(movie.age)}
          </Text>
        </View>
        {/* Genre */}
        <View
          style={[
            styles.categoryContainer,
            { paddingHorizontal: SIZES.padding },
          ]}>
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {/* {movieGenre.genre.map((data, i) => (
              (i<2) &&(
                <Text key={i} style={{ color: COLORS.white, ...FONTS.h4 }}>
                {data+" "}
              </Text>
              )
            ))} */ movie.genre}
          </Text>
        </View>
        {/* Rating */}
        <View style={styles.categoryContainer}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
          <Text style={{ marginLeft: SIZES.base, color: COLORS.white }}>
            {movie.ratings}
          </Text>
        </View>
      </View>
    );
  }
  function renderMovieDetails() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: 'space-around',
        }}>
        {/* Title, running Time and progress bar */}

        <View >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h4 }}>
              {movie.name}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
              {movie.runningTime} min
            </Text>
          </View>
          {/* Progress bar */}
          <ProgressBar
            containerStyle={{ marginTop: SIZES.radius }}
            barStyle={{ height: 5, borderRadius: 3 }}
            barPercentage={movie.progress}
          />
        </View>
        {/* Watch */}
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => {
            // console.log("Pressed", movie);
            navigation.navigate('PlayMovie', { movie })
          }}
          >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
            {movie.progress == '0%'
              ? 'WATCH NOW'
              : 'CONTINUE WATCHING'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Pressed", movie);
            navigation.navigate('RoomStack', { movie })
          }}
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: 15,
            backgroundColor: COLORS.primary,
          }}>
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
            CREATE ROOM
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      <StatusBar
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      {renderHeaderSection()}
      {/* category and rating */}
      {renderCategoryAndRating()}
      {/* MovieDetails */}
      {renderMovieDetails()}
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});
