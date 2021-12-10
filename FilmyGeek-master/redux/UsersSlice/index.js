import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        usersList: [],
        userInfo:{},
        friendsList:[],
    },
    reducers: {
        addUsersList: (state, action) => {
            // console.log(action.payload)
            return { ...state, usersList: action.payload }
        },
        addUserInfo: (state, action) => {
            // console.log(action.payload)
            return { ...state, userInfo: action.payload }
        },
        addFriendsList: (state, action) => {
            // console.log(action.payload)
            return { ...state, friendsList: action.payload }
        },
        resetUser: (state, action) => {
            return {
                usersList: [],
                userInfo:{},
                friendsList:[],
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { addUsersList,addUserInfo,addFriendsList,resetUser} = usersSlice.actions

export default usersSlice.reducer