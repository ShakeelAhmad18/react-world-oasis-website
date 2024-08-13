

import { createContext, useContext, useState } from 'react'

const ReservationContext=createContext()


const initialState={ from:undefined,to:undefined }



function ReservationProvider({children}){
    const [range,setRange]=useState(initialState)
    const resetRange=()=>setRange(initialState)
     return(
        <ReservationContext.Provider value={{ range,setRange,resetRange}}>
            {children}
        </ReservationContext.Provider>
     )
}

// custom Hook

 function useReservation(){
    const context=useContext(ReservationContext)

    if(context === undefined){
       throw new Error('Context is used outside the provider')
    }

    return context
 }

 export {ReservationProvider,useReservation};
 
