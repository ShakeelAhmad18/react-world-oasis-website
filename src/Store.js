import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/authSlice'
import bookingReducer from './redux/bookingSlice'
import cabinReducer from './redux/cabinSlice'

export const Store=configureStore({
    reducer:{
        auth:authReducer,
        booking:bookingReducer,
        cabin:cabinReducer
    }
})