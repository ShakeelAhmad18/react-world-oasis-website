import { useDispatch, useSelector } from "react-redux";
import ReservationCard from "../components/ReservationCard";
import useRedirectLogoutUser from "../customeHook/useRedirectLogoutUser";
import { useEffect } from "react";
import { getBookings } from "../redux/bookingSlice";
import { selectIsLoggedIn } from "../redux/authSlice";


export default function Reservations() {

  const dispatch=useDispatch()
  const isLoggedIn=useSelector(selectIsLoggedIn)
  useRedirectLogoutUser('/login')
  const bookings=useSelector((state)=>state.booking.bookings) || []

  useEffect(()=>{
       if( isLoggedIn === true )
       dispatch( getBookings() )
  },[dispatch,isLoggedIn])

  // CHANGE
 // const bookings = [];

 console.log(bookings)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
