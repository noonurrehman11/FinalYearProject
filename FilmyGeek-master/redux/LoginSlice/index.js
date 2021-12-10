import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
// import { getCitizenInfo } from '../../../services/Store';


// export const fetchUser = createAsyncThunk(
//     "login/fetchUser",
//     async (uid, thunkApi) => {

//         const data = await getCitizenInfo(uid)

//         console.log("THUNK", data.data());
//         // thunkApi.success(data);
//         const userId=await AsyncStorage.getItem('uid');
//         return {userId,userData:data.data()}

//     }
// )


export const loginSlice = createSlice({
    name: 'movie',
    initialState: {
        isLogin: false,
        isError: '',
    },
    reducers: {
        loggedIn: (state, action) => {
            // console.log(action.payload)
            return { ...state, isLogin:action.payload }
        },
        resetLogin: (state, action) => {
            return {isLogin: false,isError: '',}
        }

    },
    // extraReducers: {
    //     [fetchUser.fulfilled]: (state, action) => {
    //         console.log("Action FULFILLED", action.payload)
    //         return {...state, isLogin: true, data: action.payload ,isLoading: false, isError: ''}
    //     },
    //     [fetchUser.pending]: (state) => {
    //         return {...state, isLoading: true, isError: ''}
    //     },
    //     [fetchUser.rejected]: (state, action) => {
    //         return {...state, isLoading: false, isError: "Error in api"}
    //     }
    // }
})

// Action creators are generated for each case reducer function
export const { loggedIn,resetLogin } = loginSlice.actions

export default loginSlice.reducer