
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { VscBellDot } from "react-icons/vsc";
import { RiAdminFill } from "react-icons/ri"
import { Link, useLocation } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import { useSelector } from 'react-redux';
import { selectGuest } from '../redux/authSlice';

/*const navLinks = [
  {
    name: 'Home',
    to: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    to: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Guest profile',
    to: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name:'Add Cabin',
    to:'/account/admin',
    icon:<RiAdminFill/>
  }
];*/

function SideNavigation() {
  const location=useLocation()
  const guest=useSelector(selectGuest)

  const navLinks = [
    {
      name: 'Home',
      to: '/account',
      icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
    },
    {
      name: 'Reservations',
      to: '/account/reservations',
      icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
    },
    {
      name: 'Guest profile',
      to: '/account/profile',
      icon: <UserIcon className='h-5 w-5 text-primary-600' />,
    },
    ...(guest?.role === 'admin') ? [
    {
      name:'Add Cabin',
      to:'/account/admin',
      icon:<RiAdminFill/>
    },
    {
      name:'Bookings',
      to:'/account/Bookings',
      icon:<VscBellDot />
    }
   ] : []
  ];

  return (
    <nav className='border-r border-primary-900 mt-10'>
      <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${ location.pathname === link.to ? 'bg-primary-700 hover:bg-primary-700' :''}`}
              to={link.to}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className='mt-auto'>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
