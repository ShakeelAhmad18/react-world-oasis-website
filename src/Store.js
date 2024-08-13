import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/authSlice'
import bookingReducer from './redux/bookingSlice'


export const Store=configureStore({
    reducer:{
        auth:authReducer,
        booking:bookingReducer
    }
})