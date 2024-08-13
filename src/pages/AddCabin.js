import React, { useState } from 'react'

export default function AddCabin() {

    const [formData,setFormData]=useState()

   const  handleInputChange=(e)=>{
      const {name,value}=e.target;
       setFormData({...formData,[name]:value})
   }

    function handleSubmit(e){
      e.preventDefault();
      console.log(formData)
    }

  return (
    <div className='items-center'>
      <h1 className='flex-1 text-3xl text-purple-700 justify-between ml-10'>Add Cabin</h1>
      <form onSubmit={handleSubmit}>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Name</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2 mb-3' name='name' onChange={handleInputChange} placeholder='Cabin Name...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Regular Price</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='regularPrice' onChange={handleInputChange} placeholder='Regular Price...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Discount</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='discount' onChange={handleInputChange} placeholder='Discount...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Description</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='description' onChange={handleInputChange} placeholder='Discription...'/><br/>
          <label className='mt-10 mb-3 text-primary-100 text-xl'>Max Capacity</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='maxCapacity' onChange={handleInputChange} placeholder='Regular Price...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Image : formet(jpg,jpeg,png)</label><br/>
         <input type='file' className='rounded py-2 px-5 mt-2' onChange={handleInputChange} name='image' /><br/>
         <button className='py-3 px-2 bg-blue-800 text-xl mt-3 mb-3 rounded'>Add Cabin</button>
      </form>
    </div>
  )
}
