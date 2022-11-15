import { configureStore, combineReducers } from '@reduxjs/toolkit'
import customerReducer from '../../../components/beneficiary/beneficiarySlice.js'
import interviewReducer from '../../../components/interview/InterviewSlice.js'
import userReducer from '../../../components/user/userSlice.js'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

const rootReducer = combineReducers({
  customer: customerReducer,
  interview: interviewReducer,
  user: userReducer,
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export let persistor = persistStore(store)
