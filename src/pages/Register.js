
import {Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateEmail } from "../Services/helper";
import { regsiterGuest } from "../Services/authServies";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../redux/authSlice";
import Spinner from "../components/Spinner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [nationalID,setNationalID]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !nationalID) {
        return toast.error("All fields are necessary.");
    }

    if(password.length < 8){
        return toast.error('Password must be 8 character')
      }
    
    if(!validateEmail(email)){
        return toast.error('Please Enter Valid Email')
       }
    
    const userData={
        name,email,nationalID,password
      }

    setIsLoading(true)
    try {

        const data=await regsiterGuest(userData)
        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.name))
        navigate('/account')
        setIsLoading(false)

    }catch(error){
        setIsLoading(false)
        console.log(error.message)
    }
    
       
  }
  return (
    <div className="grid place-items-center h-screen bg-primary-400">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-primary-900">Register</h1>
        {isLoading && <Spinner/>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="text-slate-800 rounded py-1"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
            <input className="text-slate-800 rounded py-1"
            onChange={(e) => setNationalID(e.target.value)}
            type="text"
            placeholder="National ID"
          />
          <input
            className="text-slate-800 rounded py-1"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="text-slate-800 rounded py-1"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          <Link className="text-sm mt-3 text-right" to={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}