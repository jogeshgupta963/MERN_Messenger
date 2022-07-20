import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import myChatsReducer from './myChats'
import chatReducer from './chat'
export const store = configureStore({
  reducer: {
    user: userReducer,
    myChats: myChatsReducer,
    chat: chatReducer,
  },
})
