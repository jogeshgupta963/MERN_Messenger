import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchMyChats = createAsyncThunk(
  'myChats/fetchMyChats',
  async () => {
    try {
      const { data } = await axios.get(`/chat`)

      return data
    } catch (error) {
      return error.message
    }
  },
)
export const myChats = createSlice({
  name: 'myChats',
  initialState: {
    myChats: [],
    status: null,
    error: '',
  },
  extraReducers: {
    [fetchMyChats.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchMyChats.fulfilled]: (state, action) => {
      state.myChats = action.payload
      state.status = 'success'
    },
    [fetchMyChats.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

// export const { deleteProduct } = productListSlice.actions
export default myChats.reducer
