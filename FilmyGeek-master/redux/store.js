import { configureStore } from '@reduxjs/toolkit'

import movieReducer from './MovieSlice'
import usersReducer from './UsersSlice'
import loginReducer from './LoginSlice'

export default configureStore({
    reducer: {
        movie: movieReducer,
        user: usersReducer,
        login:loginReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})