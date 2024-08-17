import React, { useState } from 'react'
import {createCabin, selectIsLoading} from '../redux/cabinSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function AddCabin() {
   const dispatch=useDispatch()
  const [name,setName]=useState('')
  const [maxCapacity,setMaxCapacity]=useState('')
  const [regularPrice,setRegularprice]=useState('')
  const [discount,setDiscount]=useState('')
  const [description,setDescription]=useState('')
  const [image,setCabinImage]=useState('')
  const navigate=useNavigate()
  const isLoading=useSelector(selectIsLoading)

   async function handleSubmit(e){
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('maxCapacity', maxCapacity);
      formData.append('regularPrice', regularPrice);
      formData.append('discount', discount);
      formData.append('description', description);
      formData.append('image', image);
     console.log(formData)
     await dispatch(createCabin(formData))
     navigate('/cabins')
    }

  return (
    <div className="grid place-items-center h-screen">
     <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-violet-950">
      <h1 className="text-xl font-bold my-4 text-primary-100">Add Cabin</h1>
      {isLoading && <Spinner/>}
      <form onSubmit={handleSubmit}>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Name</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2 mb-3' name='name' value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Cabin Name...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Regular Price</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='regularPrice' value={regularPrice} onChange={(e)=>setRegularprice(e.target.value)}  placeholder='Regular Price...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Discount</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='discount' value={discount} onChange={(e)=>setDiscount(e.target.value)}  placeholder='Discount...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Description</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='description' value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder='Discription...'/><br/>
          <label className='mt-10 mb-3 text-primary-100 text-xl'>Max Capacity</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='maxCapacity' value={maxCapacity} onChange={(e)=>setMaxCapacity(e.target.value)}  placeholder='Max Capacity...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Image : formet(jpg,jpeg,png)</label><br/>
         <input type='file' className='rounded py-2 px-5 mt-2' name='image' onChange={(e)=>setCabinImage(e.target.files[0])} /><br/>
         <button className='py-3 px-2 bg-blue-800 text-xl mt-3 mb-3 rounded'>Add Cabin</button>
      </form>
      </div>
    </div>
  )
}
