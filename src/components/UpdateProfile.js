
import React, { useEffect, useState } from 'react'
import SelectCountry from './SelectCountry';
import { useDispatch} from 'react-redux';
import { SET_EMAIL, SET_GUEST, SET_NAME } from '../redux/authSlice';
import { getGuest, updateGuest } from '../Services/authServies';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function UpdateProfile() {
  const dispatch=useDispatch();
  const [profile,setProfile]=useState([]);
  const navigate=useNavigate()
  //const guest=useSelector(selectGuest)

  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setProfile({...profile,[name]:value})
  }
  //get user data

   useEffect(()=>{
    async function getUser(){
      const data=await getGuest()
      setProfile(data);
      dispatch(SET_GUEST(data))
      dispatch(SET_NAME(data.name))
    }
    getUser()
   },[dispatch])

  //  const [count,setCount]=useState()
    //const countryFlag = "pt.jpg";
   // const nationality = "portugal";
   
  async function handleSubmit(e){
       e.preventDefault()

       const [natinality,countryFlag]=profile.natinality.split('%')

       const formData={
        natinality:natinality,
        countryFlag:countryFlag,
        email:profile.email,
        nationalID:profile.nationalID,
       }
         await updateGuest(formData)
         const data=await getGuest()
         setProfile(data);
         dispatch(SET_GUEST(data))
         dispatch(SET_NAME(data.name))
         dispatch(SET_EMAIL(data.email))
        navigate('/account/profile')
        toast.success('Guest Updated')
  }


  
  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col" onSubmit={handleSubmit} >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            name='name'
            defaultValue={profile?.name}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
             name='email'
             defaultValue={profile?.email}
            disabled
            
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={profile.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />

          </div>
          <SelectCountry
            name="natinality"
            id="natinality"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={profile.natinality}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            defaultValue={profile?.nationalID}
            onChange={handleInputChange}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
         Update profile
     </button>
        </div>
      </form>
  )
}

/*function Button(){

  const {pending}=useFormStatus()

   return(
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
    {pending ? "Update..."  : "Update profile"}
  </button>
   )
}*/
