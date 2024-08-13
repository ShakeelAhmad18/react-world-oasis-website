import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStatus } from '../Services/authServies'
import { SET_LOGIN } from '../redux/authSlice'
import toast from 'react-hot-toast'


const  useRedirectLogoutUser =(path)=> {
      const dispatch=useDispatch()
      const navigate=useNavigate()

   useEffect(()=>{
     async function RedirectLogoutUser(){

        const isLoggedIn=await loginStatus()
        dispatch(SET_LOGIN(isLoggedIn))

        if(!isLoggedIn){
            toast.error('Session Expire! Please Login')
            navigate(path)
            return
        }
        
     }
     RedirectLogoutUser()
   },[dispatch,navigate,path])

}

export default useRedirectLogoutUser;
