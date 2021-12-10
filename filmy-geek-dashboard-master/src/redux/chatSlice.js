import { createSlice } from '@reduxjs/toolkit'


const initialState= {
  chatId: '',
  chatName: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state,actions) => {
        return {...state, chatId: actions.payload.chatId, chatName: actions.payload.chatName}
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setChat } = chatSlice.actions

export default chatSlice.reducer