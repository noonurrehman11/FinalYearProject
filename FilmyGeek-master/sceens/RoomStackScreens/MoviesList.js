
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const itemWidth = (width / 3) * 2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;
const MoviesList = ({ navigation, route }) => {
    // console.log("Room Name", route.params)
    const { roomName } = route.params;
    const [selected, setSelected] = useState(false)
    const [moviee, setMovie] = useState({})
    const movies = useSelector(state => state.movie.moviesList)
    const scrollX = useRef(new Animated.Value(0)).current;
    const next = () => {
        console.log('Next')
    }
    function Item({ i, scrollX, movie }) {
        const scale = scrollX.interpolate({
            inputRange: [-offset + i * offset, i * offset, offset + i * offset],
            outputRange: [0.75, 1, 0.75],
        });
        return (
            <Animated.View style={[styles.item, { transform: [{ scale }],borderWidth:1,borderColor:'rgba(255, 0, 46,0.6)',backgroundColor:moviee._id===movie._id?'rgba(255, 0, 46,0.6)':"#000" }]} >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setMovie(movie)
                        setSelected(true)
                    }}>
                    <Image source={{ uri: movie.picture }}
                        style={{ width: itemWidth, height: 300 }} />
                    <Text style={{ color: moviee._id===movie._id?'#fff':'rgba(255, 0, 46,0.6)', fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10 }}>{movie.name}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
            <Text style={{ color: 'rgba(255, 0, 46,0.7)', fontSize: 25, fontWeight: 'bold', paddingTop: 100 }}>Select Movie</Text>
            <ScrollView
                horizontal
                pagingEnabled
                decelerationRate="fast"
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                snapToInterval={offset}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}>

                {movies.map((movie, i) => (
                    <Item key={movie._id} i={i} scrollX={scrollX} movie={movie} />
                ))}
            </ScrollView>

            <TouchableOpacity style={{ backgroundColor: selected ? 'rgba(255, 0, 46,0.7)' : 'rgba(255, 0, 46,0.3)', marginBottom: 100, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
                onPress={() => { next() }}
            >
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}



export default MoviesList

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: padding,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: '#000',
    },
    item: {
        // height: itemWidth,
        // width: itemWidth,
        backgroundColor: '#000',
        borderRadius: 10,
    },
});




