import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateCabin, UpdateCabin } from "../Services/Services";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  cabins: []
};

// Create cabin thunk
export const createCabin = createAsyncThunk(
  'cabin/create',
  async (formData, ThunkApi) => {
    try {
      const data = await CreateCabin(formData);
      console.log('Returned Data:', data);
      return data; // Assuming this returns a serialized object
    
    } catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.toString();
      toast.error(message);
      return ThunkApi.rejectWithValue(message);
    }
  }
);

export const updateCabin=createAsyncThunk(
  'cabin/updated',
  async ({id,formData},ThunkApi)=>{
    try {
      return await UpdateCabin(id,formData)
    } catch (error) {
      const message = (error.response && error.response.data &&
        error.response.data.message) || error.message || error.toString();
      toast.error(message);
      return ThunkApi.rejectWithValue(message);
    }
  }
  
)

const cabinSlice = createSlice({
  name: 'cabin',
  initialState,
  reducers: {
    Add_CABIN(){}
  },
  extraReducers: (builders) => {
    builders
      .addCase(createCabin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCabin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cabins.push(action.payload);
        toast.success('Cabin successfully created');
      })
      .addCase(createCabin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCabin.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(updateCabin.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        toast.success('Cabin Updated')
      })
      .addCase(updateCabin.rejected,(state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        toast.error(action.payload)
      })
  }
});

export const {Add_CABIN}=cabinSlice.actions;
 export const  selectIsLoading=(state)=>state.cabin.isLoading;
 export default cabinSlice.reducer;
