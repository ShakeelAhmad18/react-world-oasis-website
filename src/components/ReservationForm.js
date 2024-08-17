import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectName } from "../redux/authSlice";
import { differenceInDays } from "date-fns";
import {useReservation} from './ReservationContext'
import { useState } from "react";
import {createBooking, selectIsLoading } from "../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import { BookingConfirmationEmail } from "../Services/bookingServices";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

  function ReservationForm({cabin,cabinId}) {
    const [observation,setObservation]=useState('')
    const isLoading=useSelector(selectIsLoading)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [numGuests,setGuests]=useState('')
   const user_name=useSelector(selectName)
   const user_email=useSelector(selectEmail)
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
   //const regularprice=regularPrice-discount
   
   const handleCreateBooking=async (e)=>{
    e.preventDefault()

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

    const emailData={
      user_name,
      user_email,
      name,
      numNights,
      numGuests,
      startDate,
      endDate,
      totalPrice
    }
     
     await dispatch(createBooking(formData))
     const data=await BookingConfirmationEmail(emailData)
     toast.success(data)
     console.log(data)
     resetRange();
     navigate('/account/thankyou')
   }
   
  return (
    <div className='scale-[1.01]'>
      {isLoading && <Spinner/>}
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

         <div className='flex gap-4 items-center'>
         
          <p>{user_name}</p>
        </div> 
      </div>
      <form className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col' onSubmit={handleCreateBooking}>
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
