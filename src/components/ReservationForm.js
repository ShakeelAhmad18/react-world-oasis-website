import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../redux/authSlice";
import { differenceInDays } from "date-fns";
import {useReservation} from './ReservationContext'
import { useState } from "react";
import { createBooking } from "../redux/bookingSlice";
//import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

  function ReservationForm({cabin,cabinId}) {
    const [observation,setObservation]=useState('')
    const dispatch=useDispatch();
   // const navigate=useNavigate()
    const [numGuests,setGuests]=useState('')
   const user=useSelector(selectName)
   const {range,resetRange}=useReservation();

   const {name,maxCapacity,regularPrice,discount} = cabin;
   const startDate=range.from;
   const endDate=range.to;
   const numNights=Math.abs(differenceInDays(startDate,endDate));
   const cabinPrice=Math.abs(numNights * (regularPrice - discount));
   const extraPrice=0;
   const totalPrice=cabinPrice;
   const isPaid=false;
   const hasBreakfast=false;
   const status='unconfirmed'
   const regularprice=regularPrice-discount
   
  /* const handleCreateBooking=async (e)=>{
     const formData={
       startDate,
       endDate,
       numGuests,
       numNights,
       cabinPrice,
       observation,
       extraPrice,
       totalPrice,
       isPaid,
       hasBreakfast,
       status,
       cabinId
     }
     await dispatch(createBooking(formData))
   }*/
   
   const makePayment=async (e)=>{
     e.preventDefault();

     const stripe= await loadStripe('pk_test_51PB07sDu3INfeks6UGFt0KC5Nkma2uGm3xLkR7GgcCAVhA9tb5slb71hoxmao4TaVFZq23eX10w3QlZdt9BvNTyR00hoXmDIEK')
     const formData={
      name,
      startDate,
      endDate,
      numGuests,
      numNights,
      regularprice,
      cabinPrice,
      observation,
      extraPrice,
      totalPrice,
      isPaid,
      hasBreakfast,
      status,
      cabinId
    }

     const body={
       cabins:formData
     }

    const  headers={
      'Content-Type':'application/json'
     }
     const res=await fetch('http://localhost:5000/api/create-checkout-session',{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
     })

      const session=await res.json()
      const result=stripe.redirectToCheckout({
        sessionId:session.id
      })
     
      if(result.error){
        console.log(result.error)
      }else{
         await dispatch(createBooking({...formData,isPaid:true,status:'confirmed'}))
         resetRange();
      }
   }

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

         <div className='flex gap-4 items-center'>
         
          <p>{user}</p>
        </div> 
      </div>
      <form className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col' onSubmit={makePayment}>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            value={numGuests}
            onChange={(e)=>setGuests(e.target.value)}
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            value={observation}
            onChange={(e)=>setObservation(e.target.value)}
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
         { !(startDate && endDate) ?  <p className='text-primary-300 text-base'>Start by selecting dates</p>

         : <button className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
            Reserve now
          </button> 
         
          }
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
