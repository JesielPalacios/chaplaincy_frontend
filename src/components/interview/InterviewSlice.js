import { createSlice } from '@reduxjs/toolkit'

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    interviews: [],
    interview: {},
    stats: {},
    loading: false,
    error: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true
    },
    getAllInterviews: (state, action) => {
      state.loading = false
      state.error = false
      state.interviews = action.payload
    },
    error: (state) => {
      state.loading = false
      state.error = true
    },
    getInterview: (state, action) => {
      state.loading = false
      state.error = false
      state.interview = action.payload
    },
    resetInterview: (state) => {
      state.loading = false
      state.error = false
      state.interview = {}
    },
    resetFlags: (state) => {
      state.loading = false
      state.error = false
    },
    getInterviewStats: (state, action) => {
      state.loading = false
      state.error = false
      state.stats = action.payload
    },
  },
})

export default interviewSlice.reducer
export const {
  loading,
  getAllInterviews,
  error,
  getInterview,
  resetInterview,
  resetFlags,
  getInterviewStats,
} = interviewSlice.actions
