import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
const SearchScreen = ({ navigation }) => {

    const [value, setValue] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const movies = useSelector(state => {
        return state.movie.moviesList.map(item => { return { name: item.name, movieDetail: item } })
    })

    // useEffect(() => {
    //     // console.log(movies)
    //     return () => {
    //         console.log("unmount")
    //     }
    // }, [])


    const onChangeHandler = (val) => {
        // console.log("Val", val)
        let matches = []
        if (val.length > 0) {
            matches = movies.filter(usr => {
                const regex = new RegExp(`${val}`, 'gi')
                return usr.name.match(regex)
            })
        }
        // console.log('matches', matches)
        setSuggestions(matches)
        setText(val)
    }


    return (
        <View style={{ paddingHorizontal: SIZES.padding, backgroundColor: "#000", flex: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        paddingTop: 20,
                        paddingRight: 10
                    }}
                    onPress={() => {
                        // console.log('Open Drawer')
                        navigation.toggleDrawer()
                    }
                    }>
                    <MaterialCommunityIcons name="menu" color="white" size={35} />
                </TouchableOpacity>
                <View style={{ flex: 1, borderWidth: 1, borderColor: COLORS.primary, marginTop: 20, borderRadius: 25, display: 'flex', flexDirection: 'row' }}>
                    <AntDesign name="search1" size={25} color={COLORS.primary} style={{ padding: 10 }} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search Movie"
                        placeholderTextColor="#fff"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={onChangeHandler}
                        // onBlur={() => {
                        //     setTimeout(() => {
                        //         setSuggestions([])
                        //     }, 1000)
                        // }}
                        value={text}
                    />
                </View>
            </View>

            <ScrollView style={{ paddingTop: 20 }}>
                {suggestions.length !== 0 &&
                    suggestions.map((val, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            console.log('click', val)
                            navigation.navigate('MovieDetail', {
                                movie: val.movieDetail
                            })
                            setText('')
                            setSuggestions([])
                        }}>
                            <View style={styles.movieContainer}>
                                <Image source={{ uri: val.movieDetail.picture }} style={{ width: 50, height: 50, borderRadius: 25 }} />

                                <Text style={styles.text}>{val.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#fff',
        paddingLeft: 15,
        flex: 1
    },
    movieContainer: {
        display: 'flex', flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 10
    }

})
