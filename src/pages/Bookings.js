import React, { useEffect } from 'react'
import { getAllBookings, selectAdminBooking } from '../redux/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';


export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');



export default function Bookings() {
    const dispatch=useDispatch()
    const booking=useSelector(selectAdminBooking)

      useEffect(()=>{
         dispatch(getAllBookings())
      },[dispatch])
    

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {booking.map((bookings, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-primary-300 p-4">
              <img className="w-full h-48 object-cover" src={bookings?.cabinId?.image?.filePath} alt={bookings?.guestId?.name} />
              <div className="px-6 py-4">
                <div className="flex items-center text-green-200 justify-between font-bold text-xl mb-2">{bookings?.cabinId?.name}
                {isPast(new Date(bookings?.startDate)) ? <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>past</span> : <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>upcoming</span>}
                </div>
                <p className="text-gray-700 text-base">
                  Booking Date: <span className="font-semibold"> {format(new Date(bookings?.startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(bookings?.startDate))
            ? 'Today'
            : formatDistanceFromNow(bookings?.startDate)}
          ) &mdash; {format(new Date(bookings?.endDate), 'EEE, MMM dd yyyy')}</span>
                </p>
                <p className="text-gray-700 text-base">
                  Price: <span className="font-semibold">${bookings?.totalPrice}</span>
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 border-t mt-2">
                <div className="font-semibold text-gray-900">Booked by:</div>
                <p className="text-gray-700">Name: {bookings?.guestId?.name}</p>
                <p className="text-gray-700">Email: {bookings?.guestId?.email}</p>
              </div>
            </div>
          ))}
        </div>
      );
      
}