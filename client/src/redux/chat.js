import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchChat = createAsyncThunk(
  'chat/fetchChat',
  async ({ chatId }) => {
    try {
      const { data } = await axios.get(`/chat/${chatId}`)

      return data
    } catch (error) {
      return error.message
    }
  },
)
export const chat = createSlice({
  name: 'chat',
  initialState: {
    chat: {},
    status: null,
    error: '',
  },
  extraReducers: {
    [fetchChat.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchChat.fulfilled]: (state, action) => {
      state.chat = action.payload
      state.status = 'success'
    },
    [fetchChat.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

// export const { deleteProduct } = productListSlice.actions
export default chat.reducer
