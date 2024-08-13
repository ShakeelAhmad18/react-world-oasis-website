import axios from 'axios'
import toast from 'react-hot-toast'

//register the guest

export const regsiterGuest=async (formData)=>{
    try {
        const res=await axios.post('http://localhost:5000/api/guest/register',formData,{withCredentials:true})

        if(res.statusText === 'OK'){
             toast.success('User Register Successfully')
        }
        return res.data;

    } catch (error) {
        const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();

        toast.error(message)
    }
   
}

//Login Guest

export const loginGuest=async (formData)=>{
   try {
     const res=await axios.post('http://localhost:5000/api/guest/login',formData)
     if(res.statusText === 'OK'){
        toast.success('Guest Login Sucessfully')
     }
    return res.data;

   } catch (error) {

    const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();

        toast.error(message)
   }
}


// logout Guest

export const logoutGuest=async ()=>{
    try {
      const res=await axios.get('http://localhost:5000/api/guest/logout')
      if(res.statusText === 'OK'){
         toast.success('Successfully Logout')
      }
      return res.data;

    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
    
            toast.error(message)
    }
}

//login status

export const loginStatus=async ()=>{
    try {
        const res=await axios.get('http://localhost:5000/api/guest/status')
        return res.data
    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
    
            toast.error(message)
    }
}

//get Guest

export const getGuest=async ()=>{
    try {
        const res=await axios.get('http://localhost:5000/api/guest/getguest')
        return res.data;
    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
    
            toast.error(message)
    }
}

//update Guest

export const updateGuest=async (formData)=>{
    try {
        const res=await axios.patch('http://localhost:5000/api/guest/update',formData)
       return res.data;
    } catch (error) {
        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
    
            toast.error(message)
    }
   
}





