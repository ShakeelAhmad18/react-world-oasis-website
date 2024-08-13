import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking,updateReservation } from "../redux/bookingSlice";
import { getCabin } from "../Services/Services";

export default function EditReservation() {
    
    const { id } = useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const Booking=useSelector((state)=>state.booking.booking);
    const [booking,setBooking]=useState(Booking);
    const [cabin,setCabin]=useState([])
     const cabinId=Booking.cabinId;
    function handleInputChange(e){
      const {name,value}=e.target;
      setBooking({...booking,[name]:value})
   } 

    
   useEffect(() => {
    async function fetchCabin(cabinId) {
      try {
        const res = await getCabin(cabinId);
        const cabinData = res.data;
        setCabin(cabinData);
      } catch (error) {
        console.error('Error fetching cabin:', error);
      }
    }
    fetchCabin(cabinId);
  }, [cabinId]);

  //get maxCapacity from cabin 
   const maxCapacity=cabin.maxCapacity;
    
    const {numGuests,observation}=booking;

    useEffect(()=>{
       dispatch(getBooking(id))
    },[dispatch,id])

    useEffect(() => {
  setBooking(Booking);
    }, [Booking]);

     const handleSubmit=async (e)=>{
        e.preventDefault()
       const formData={
         numGuests:Number(booking?.numGuests),
         observation:booking?.observation
       }
        console.log(formData)
        await dispatch(updateReservation({id,formData}))
        navigate('/account/reservations')
     }


  
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Edit Reservation # {id}
        </h2>
  
        <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              defaultValue={numGuests}
              onChange={handleInputChange}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="observations">
              Anything we should know about your stay?
            </label>
            <textarea
              name="observation"
              defaultValue={observation}
              onChange={handleInputChange}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>
  
          <div className="flex justify-end items-center gap-6">
            <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
              Update reservation 
            </button>
          </div>
        </form>
      </div>
    );
  }