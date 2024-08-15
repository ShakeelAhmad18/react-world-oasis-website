
import { Suspense } from "react";
//import Filter from "../_components/Filter";
import CabinList from "../components/CabinList";
import Spinner from "../components/Spinner";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";
import ReservationReminder from "../components/ReservationReminder";

export default function Page() {
  const [searchParam]=useSearchParams()
  const filter=searchParam.get('capacity')
  
  return (
    <div>
      <h1 className="text-4xl mb-5 ml-4 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-8 ml-3 mr-2">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
       <div className="flex mb-8 justify-end">
        { <Filter/> }
       </div>
      <Suspense fallback={<Spinner/>}>
        <CabinList filter={filter} key={filter}/>
       {<ReservationReminder/> }
      </Suspense>
      
    </div>
  );
}
