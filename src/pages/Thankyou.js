import React from 'react'
import { Link } from 'react-router-dom'

export default function Thankyou() {
  return (
    <div className='text-center space-y-6 mt-8 mr-10'>
        <h1 className='text-3xl font-semibold'>Thank you for your reservation!💖</h1>
        <Link to='/account/reservations' className='underline text-xl text-accent-500 inline-block'>
          Manage Your Reservations &rarr;
        </Link>
    </div>
  )
}
