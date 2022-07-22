import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import socket from '../socket'
import axios from 'axios'

export const fetchchatMessages = createAsyncThunk(
  'chatMessages/fetchchatMessages',
  async ({ id }) => {
    try {
      const { data } = await axios.get(`/message/${id}`)

      return data
    } catch (error) {
      return error.message
    }
  },
)
export const chatMessages = createSlice({
  name: 'chatMessages',
  initialState: {
    chatMessages: [],
    status: null,
    error: '',
  },
  extraReducers: {
    [fetchchatMessages.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchchatMessages.fulfilled]: (state, action) => {
      state.chatMessages = action.payload

      state.status = 'success'
    },
    [fetchchatMessages.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

// export const { deleteProduct } = productListSlice.actions
export default chatMessages.reducer
