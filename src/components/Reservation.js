
import { useEffect, useState } from 'react'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedCabinDates, getSettings } from '../Services/Services'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/authSlice'
import LoginMessage from './LoginMessage'
 
 export default function Reservation({cabin,id}) {
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const [bookedDates,setBookedDates]=useState([])
    const [settings,setSettings]=useState([])


    useEffect(()=>{
     async function fetchDates(id){
         const data=await getBookedCabinDates(id)
         setBookedDates(data)
      }
      fetchDates(id)
    },[id])


    
    useEffect(()=>{
      async function Settings(){
       const data =  await getSettings()
       setSettings(data)
      }
      Settings();
    },[])
  // bookedDates={bookedDates}
   console.log(settings)
   return (
    <div className="grid grid-cols-2 border border-primary-800">
          <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates}/>
         {isLoggedIn ? <ReservationForm cabin={cabin} cabinId={id} /> : <LoginMessage/> }
        </div>
   )
 }
 