import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCabin } from '../Services/Services';

export default function EditCabin() {
    const [cabin,setCabin]=useState('')
    const [image,setCabinImage]=useState('')
    const {id}=useParams()

    const handleImageChange=(e)=>{
      setCabinImage(e.target.files[0])
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setCabin({...cabin,[name]:value})
    }
    
    useEffect(() => {
        async function fetchCabin() {
          try {
            const res = await getCabin(id);
            const cabinData = res.data;
            setCabin(cabinData);
          } catch (error) {
            console.error('Error fetching cabin:', error);
          }
        }
        fetchCabin();
      }, [id]);


   async function handleUpdate(e){
           e.preventDefault();

           const formData={
            'name':cabin.name,
            'image':image
           }

           console.log(formData)
      }
    
  return (
    <div className='flex'>
      <h1 className='text-3xl text-purple-700 ml-10 items-center'>Edit Cabin</h1>
      <form className='mt-10 ml-60' onSubmit={handleUpdate}>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Name</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2 mb-3' name='name' defaultValue={cabin.name} onChange={handleInputChange} placeholder='Cabin Name...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Regular Price</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='regularPrice' defaultValue={cabin.regularPrice} onChange={handleInputChange} placeholder='Regular Price...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Discount</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='discount' defaultValue={cabin.discount} onChange={handleInputChange} placeholder='Discount...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Description</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='description' defaultValue={cabin.description} onChange={handleInputChange} placeholder='Discription...'/><br/>
          <label className='mt-10 mb-3 text-primary-100 text-xl'>Max Capacity</label><br/>
         <input type='text' className='rounded py-2 px-5 bg-primary-700 border ring-primary-900 hover:ring-primary-900 border-primary-700 ring-1 text-white w-[300px] mt-2' name='maxCapacity' defaultValue={cabin.maxCapacity} onChange={handleInputChange} placeholder='Max Capacity...'/><br/>
         <label className='mt-10 mb-3 text-primary-100 text-xl'>Image : formet(jpg,jpeg,png)</label><br/>
         <input type='file' className='rounded py-2 px-5 mt-2' onChange={handleImageChange} name='image' /><br/>
         <button className='py-3 px-2 bg-blue-800 text-xl mt-3 mb-3 rounded'>Add Cabin</button>
      </form>
    </div>
  )
}
