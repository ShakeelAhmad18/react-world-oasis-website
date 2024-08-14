import { useSelector } from 'react-redux'
import useRedirectLogoutUser from '../customeHook/useRedirectLogoutUser'
import { selectName } from '../redux/authSlice'



export default function Account() {
    useRedirectLogoutUser('/login')

    const name=useSelector(selectName)

  return (
    <div>
       <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {name}
      </h2>
    </div>
  )
}
