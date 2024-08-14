
import axios from 'axios'
import { eachDayOfInterval } from 'date-fns';
import toast from 'react-hot-toast';


//create a new cabin

export const CreateCabin=async (formData)=>{

  try {

    const res=await axios.post('http://localhost:5000/api/cabins',formData)
    return res.data;

  } catch (error) {

      const message=(error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString();
      toast.error(message)
      throw new Error(message);
  }

}

export async function getCabin(id) {
    /*const { data, error } = await supabase
      .from('cabins')
      .select('*')
      .eq('id', id)
      .single();*/
  
      try {
  
        const data=await axios.get(`http://localhost:5000/api/cabins/${id}`)
  
        return data;
        
      } catch (error) {
        if (error) {
          console.error(error);
        }
      }
  
    // For testing
    // await new Promise((res) => setTimeout(res, 1000));
  
    
  }


  //get Booked Cabin Dates

 export const getBookedCabinDates=async (id)=>{
    try {
       const res=await axios.get(`http://localhost:5000/api/booking/getbooking/cabin/${id}`)
       const  data= res.data;

       const bookedDates = data
       .map((booking) => {
         return eachDayOfInterval({
           start: new Date(booking.startDate),
           end: new Date(booking.endDate),
         });
       })
       .flat();
   
      return bookedDates;

    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  }


    //get all cabins

  export const getCabins = async function () {
    /*const { data, error } = await supabase
      .from('cabins')
      .select('id, name, maxCapacity, regularPrice, discount, image')
      .order('name');
  
    if (error) {
      console.error(error);
      throw new Error('Cabins could not be loaded');
    } */
  
    try {
  
      const res=await axios.get('http://localhost:5000/api/cabins')
      return res.data;
      
    } catch (error) {
      console.log(error)
    }
     
    
  };


 export const UpdateCabin=async (id,formData)=>{
    try {
      const res=await axios.patch(`http://localhost:5000/api/cabins/${id}`,formData)
      return res.data;
    } catch (error) {
      console.log(error.message)
    }
 }


  //get countries
  export async function getCountries() {
    try {
      const res = await fetch(
        'https://restcountries.com/v2/all?fields=name,flag'
      );
      const countries = await res.json();
      return countries;
    } catch {
      throw new Error('Could not fetch countries');
    }
  }

  //get Settings

  export const getSettings=async ()=>{
    try {
      
      const res=await axios.get('http://localhost:5000/api/sitting/getsitting')
      return res.data;

    } catch (error) {

      const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }
  }
  