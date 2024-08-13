

import React from 'react'
import useRedirectLogoutUser from '../customeHook/useRedirectLogoutUser'
import { selectName } from '../redux/authSlice'
import { useSelector } from 'react-redux'


export default function Account() {
    useRedirectLogoutUser('/login')
    const name=useSelector(selectName)
    console.log(name)
  return (
    <div>
       <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {name}
      </h2>
    </div>
  )
}
