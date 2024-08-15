import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateBooking, DeleteReservation, GetAllBookings, GetBooking, GetBookings, UpdateReservation } from "../Services/bookingServices";
import toast from "react-hot-toast";


const initialState={
    booking:[],
    bookings:[],
    adminBookings:[],
    isError:false,
    isSucess:false,
    isLoading:false,
    cart_price:'',
    message:''
}



//Created Booking
export const createBooking=createAsyncThunk(
    'booking/create',
    async (formData,ThunkApi)=>{
        try {
            return await CreateBooking(formData)
        } catch (error) {
            const message=(error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString();
                toast.error(message)
                return ThunkApi.rejectWithValue(message)
        }
    }
)

//get all bookings

export const getBookings=createAsyncThunk(
    'Bookings/getAll',
    async (_,ThunkApi)=>{
       try {
         return await GetBookings()
       } catch (error) {
          const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
           toast.error(message)
           return ThunkApi.rejectWithValue(error.message)
       }
    }
)

//asynThunk DElete reservation
 export const deleteBooking=createAsyncThunk(
    'booking/delete',
    async (bookingId,ThunkApi)=>{
        try {
            return await DeleteReservation(bookingId)
        } catch (error) {
            const message=(error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString();
               toast.error(message)
               return ThunkApi.rejectWithValue(error.message)
        }
    }
)

//admin bookings thunk

export const getAllBookings=createAsyncThunk(
  'booking/admin',
  async (_,ThunkApi)=>{
    try {

      return await GetAllBookings()

    } catch (error) {

      const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
       toast.error(message)
       return ThunkApi.rejectWithValue(error.message)

    }
  }
)


export const  updateReservation=createAsyncThunk(
  'booking/update',
  async ({id,formData},ThunkApi)=>{
    try {

      return await UpdateReservation(id,formData);

    } catch (error) {

      const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
       toast.error(message)
       return ThunkApi.rejectWithValue(error.message)

    }
  }
)

//get single booking async thunk

export const getBooking=createAsyncThunk(
  'booking/getSingleBooking',
  async (id,ThunkApi)=>{
    try {
       return await GetBooking(id)
    } catch (error) {
      const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
       toast.error(message)
       return ThunkApi.rejectWithValue(error.message)
    }
  }
)

const bookingSlice=createSlice({
    name:'booking',
    initialState,
    reducers:{
        Booking_Price(state,action){
           
        }
    },
    extraReducers: (builders) => {
        builders
          .addCase(createBooking.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bookings.push(action.payload);
            state.isSucess = true;
            state.isError = false;
            toast.success('Booking Created Successfully');
          })
          .addCase(createBooking.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSucess = false;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(getBookings.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getBookings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSucess = true;
            state.isError = false;
            state.bookings = action.payload;
          })
          .addCase(getBookings.rejected, (state, action) => {
            state.isLoading = false;
            state.isSucess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
          .addCase(deleteBooking.pending,(state)=>{state.isLoading=true})
          .addCase(deleteBooking.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSucess=true;
            toast.success('Booking Deleted Sucessfully')
          })
          .addCase(deleteBooking.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSucess=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(action.payload);
          })
          .addCase(updateReservation.pending,(state)=>{
            state.isLoading=true;
          })
          .addCase(updateReservation.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSucess=true
            toast.success('Booking Updated Sucessfully')
          })
          .addCase(updateReservation.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSucess=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(action.payload);
          })
          .addCase(getBooking.pending,(state)=>{
            state.isLoading=true
          })
          .addCase(getBooking.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSucess=true;
            state.booking=action.payload;
          })
          .addCase(getBooking.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSucess=false;
            state.message=action.payload;
            toast.error(action.payload);
          })
          .addCase(getAllBookings.pending,(state)=>{
            state.isLoading=true;
          })
          .addCase(getAllBookings.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSucess=true;
            state.adminBookings=action.payload;
          })
          .addCase(getAllBookings.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSucess=false;
            state.message=action.payload;
          })
      }
});

export const {ADD_BOOKING}=bookingSlice.actions;

export const selectAdminBooking=(state)=>state.booking.adminBookings;
export const selectIsLoading=(state)=>state.booking.isLoading;

export default bookingSlice.reducer;