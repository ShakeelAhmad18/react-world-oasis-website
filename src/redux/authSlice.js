import {createSlice} from '@reduxjs/toolkit'

const name=JSON.parse(localStorage.getItem("name"))


const initialState={
  isLoggedIn:false,
  name:name ? name : '',
  guest:{
    name:'',
    email:"",
    phone:'',
    nationalID:'',
    natinality:'',
    countryFlag:'',
    role:''
  }
}


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        SET_LOGIN(state,action){
         state.isLoggedIn=action.payload;
        },
        SET_NAME(state,action){
            localStorage.setItem('name',JSON.stringify(action.payload))
            state.name=action.payload;
        },
        SET_GUEST(state,action){
            const profile=action.payload;

            state.guest.name=profile.name;
            state.guest.email=profile.email;
            state.guest.phone=profile.phone;
            state.guest.nationalID=profile.nationalID;
            state.guest.natinality=profile.natinality;
            state.guest.countryFlag=profile.countryFlag;
            state.guest.role=profile.role
        }
    }
})


export const {SET_GUEST,SET_LOGIN,SET_NAME}=authSlice.actions;

export const selectName=(state)=>state.auth.name;
export const selectIsLoggedIn=(state)=>state.auth.isLoggedIn;
export const selectGuest=(state)=>state.auth.guest;

export default authSlice.reducer;



