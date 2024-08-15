import { TrashIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteBooking, getBookings } from '../redux/bookingSlice';
//import { useEffect } from 'react';


function DeleteReservation({ bookingId }) {
     const dispatch=useDispatch();

     async function handleDelete(bookingId){
        await dispatch(deleteBooking(bookingId))
        await dispatch(getBookings())
         
     }


     const ConfirmDeleteProduct=(id)=>{

      confirmAlert({
        title: 'Delete a Booking',
        message: 'Are you sure Delete to this Booking',
        buttons: [
          {
            label: 'Delete',
            onClick: () => handleDelete(id)
          },
          {
            label: 'Cancel',
            //onClick: () => alert('Click No')
          }
        ]
      });
    }


  return (
    <button className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900' onClick={()=>ConfirmDeleteProduct(bookingId)}>
      <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' onClick={()=>ConfirmDeleteProduct(bookingId)} />
      <span className='mt-1'>Delete</span>
    </button>
  );
}

export default DeleteReservation;
