import { createSlice } from '@reduxjs/toolkit'

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    customer: {},
    stats: {},
    loading: false,
    error: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true
    },
    getAllCustomers: (state, action) => {
      state.loading = false
      state.error = false
      state.customers = action.payload
    },
    error: (state) => {
      state.loading = false
      state.error = true
    },
    getCustomer: (state, action) => {
      state.loading = false
      state.error = false
      state.customer = action.payload
    },
    getBeneficiaryPhoto: (state, action) => {
      state.loading = false
      state.error = false
      state.customer.beneficiaryPhoto = action.payload
    },
    resetCustomer: (state) => {
      state.loading = false
      state.error = false
      state.customer = {}
    },
    resetFlags: (state) => {
      state.loading = false
      state.error = false
    },
    getBeneficiaryStats: (state, action) => {
      state.loading = false
      state.error = false
      state.stats = action.payload
    },
  },
})

export default customerSlice.reducer
export const {
  loading,
  getAllCustomers,
  error,
  getCustomer,
  getBeneficiaryPhoto,
  resetCustomer,
  resetFlags,
  getBeneficiaryStats,
} = customerSlice.actions
