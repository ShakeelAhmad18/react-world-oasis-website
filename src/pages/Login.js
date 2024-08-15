
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../Services/helper";
import { useDispatch } from "react-redux";
import { loginGuest } from "../Services/authServies";
import { SET_LOGIN, SET_NAME } from "../redux/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
        return toast.error('Fill all Fields')
       }

    if(!validateEmail(email)){
        return toast.error('Enter Valid Email')
    }
    
    if(password.length < 8){
        return toast.error('Password does not less than 8 character')
    }

   const guestData={
    email,
    password
   }

   try {
      const data=await loginGuest(guestData)
      console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/account/profile')
   } catch (error) {
    console.log(error.message)
}

 
  
  }
  
  return (
    <div className="grid place-items-center h-screen bg-primary-400">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-primary-900">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
            placeholder="Email"
            className="rounded py-1 text-green-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
            className="rounded py-1 text-green-400"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          <Link className="text-sm mt-3 text-right" to={"/register"}>
            Don&apos;t have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}