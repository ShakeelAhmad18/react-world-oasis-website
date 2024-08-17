import { useQuery } from '@tanstack/react-query'
import { loginStatus } from '../Services/authServies';
import { useDispatch } from 'react-redux';
import { SET_LOGIN } from '../redux/authSlice';

function LoginStatus() {
 const dispatch=useDispatch()

   const {data:status}= useQuery({
      queryKey:['status'],
      queryFn:loginStatus
    })
 
    dispatch(SET_LOGIN(status))
    

  return null;
}

export default LoginStatus;