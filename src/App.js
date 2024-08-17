import Header from "./components/Header";
import About from "./pages/About";
import Cabins from "./pages/Cabins";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import CabinDetails from "./components/CabinDetails";
import Layout from "./pages/Layout";
import Reservations from "./pages/Reservations";
import Profile from "./pages/Profile";
import { Toaster } from 'react-hot-toast';
import LoginForm from "./pages/Login";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginStatus } from "./Services/authServies";
import {SET_LOGIN } from "./redux/authSlice";
import Register from "./pages/Register";
import { ReservationProvider } from "./components/ReservationContext";
import EditReservation from "./components/EditReservation";
import Thankyou from "./pages/Thankyou";
import AddCabin from "./pages/AddCabin";
import EditCabin from "./components/EditCabin";
import Bookings from "./pages/Bookings";
import CheckoutForm from "./components/CheckoutForm";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginStatus from "./components/LoginStatus";

axios.defaults.withCredentials=true;

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:0
    }
  }
})


function App() {
   const dispatch=useDispatch()

  
   //get login status if user refresh the page then it get login
  useEffect(()=>{

       async function loginstatus(){
         const state=await loginStatus()
         dispatch(SET_LOGIN(state))
       }
       loginstatus()

  },[dispatch]) 
 

  return (
    <>
  <QueryClientProvider client={queryClient}>
   <ReactQueryDevtools initialIsOpen={false}/>
  <ReservationProvider>
   <Router>
    <Header/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route exact path="/cabins" element={<Cabins/>} />
       <Route path="/about" element={<About/>}/>
       <Route path="/login" element={<LoginForm/>} />
       <Route path="/register" element={<Register/>}/>
       <Route path="/checkout" element={<CheckoutForm/>}/>
       <Route path="/cabins/Edit/:id" element={<EditCabin/>}/>
       <Route path="/account" element={
        <Layout>
          <Account/>
        </Layout>}/>
        <Route exact path="/account/reservations" element={
        <Layout>
          <Reservations/>
        </Layout>}/>
        <Route exact path="/account/bookings" element={
        <Layout>
          <Bookings/>
        </Layout>}/>
        <Route path="/account/profile" element={
        <Layout>
          <Profile/>
        </Layout>}/>
        <Route path="/account/reservations/edit/:id" element={
        <Layout>
          <EditReservation/>
        </Layout>}/>
        <Route path="/account/thankyou" element={
        <Layout>
          <Thankyou/>
        </Layout>}/>
       <Route path="/account/admin" element={
        <Layout>
          <AddCabin/>
        </Layout>}/> 
       <Route path="/cabins/:id" element={<CabinDetails/>}/>
     </Routes>
   </Router>
   <Toaster position="top-center"/>
  </ReservationProvider>
  <LoginStatus/>
  </QueryClientProvider>
   </>
  );
}

export default App;
