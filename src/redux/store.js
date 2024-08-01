import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './common'
import userReducer from './user'


 const store = configureStore({
  reducer: {apiReducer,userReducer}
})

export default store