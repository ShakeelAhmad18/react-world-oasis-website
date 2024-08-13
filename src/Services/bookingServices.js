import axios from "axios"
import toast from "react-hot-toast"


//create Booking it also get cabinId
export const CreateBooking=async (formData)=>{
    try {
        const res=await axios.post('http://localhost:5000/api/booking/createbooking',formData)

        if(res.statusText === 'OK'){
            toast.success('Booking')
        }
        return res.data;
        
    } catch (error) {
        
        const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
        toast.error(message)
    }
}

//get booking
export const GetBookings=async ()=>{
   try {
      const res=await axios.get('http://localhost:5000/api/booking/getbookings',{
      withCredentials: true,
    })
      return res.data;
   } catch (error) {
    const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
        toast.error(message)
   }
}

//Delete Reservation

export const DeleteReservation=async (bookingId)=>{
   try {
     const res=await axios.delete(`http://localhost:5000/api/booking/deletebooking/${bookingId}`)
     return res.data;
   } catch (error) {
    const message=(error.response && error.response.data && 
        error.response.data.message) || error.message || error.toString();
        toast.error(message)
        throw new Error(message);
   }
}


//Update Reservation

export const UpdateReservation=async (id,formData)=>{
     try {

        const res=await axios.put(`http://localhost:5000/api/booking/update/${id}`,formData)
        return res.data;

     } catch (error) {

        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
            toast.error(message)
            throw new Error(message);
     }
}

//get single booking

export const GetBooking=async (id)=>{
    try {

        const res=await axios.get(`http://localhost:5000/api/booking/getbooking/${id}`)
        return res.data;

    } catch (error) {

        const message=(error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
            toast.error(message)
            throw new Error(message);
        
    }
}