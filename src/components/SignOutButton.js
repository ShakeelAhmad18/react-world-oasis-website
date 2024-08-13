import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutGuest } from '../Services/authServies';
import {SET_LOGIN } from '../redux/authSlice';

function SignOutButton() {
   const dispatch=useDispatch()
   const navigate=useNavigate()

  async function handleSubmit(e){
      e.preventDefault();
      await logoutGuest()
      dispatch(SET_LOGIN(false))
      navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit}>
    <button className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
      <ArrowRightOnRectangleIcon className='h-5 w-5 text-primary-600' />
      <span>Sign out</span>
    </button>
    </form>
  );
}

export default SignOutButton;
