import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: {},
    loading: false,
    error: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true
    },
    getAllUsers: (state, action) => {
      state.loading = false
      state.error = false
      state.users = action.payload
    },
    error: (state) => {
      state.loading = false
      state.error = true
    },
    getUser: (state, action) => {
      state.loading = false
      state.error = false
      state.user = action.payload
    },
    resetUser: (state) => {
      state.loading = false
      state.error = false
      state.user = {}
    },
    resetFlags: (state) => {
      state.loading = false
      state.error = false
    },
  },
})

export default userSlice.reducer
export const { loading, getAllUsers, error, getUser, resetUser, resetFlags } =
  userSlice.actions
