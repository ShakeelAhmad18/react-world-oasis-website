import { PencilIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { selectGuest } from '../redux/authSlice';

function CabinCard({ cabin }) {
  
  const { _id, name, maxCapacity, regularPrice, discount,image} = cabin;
  const admin=useSelector(selectGuest)

  return (
    <div className="flex border-primary-800 border mb-3" >
      <div className="flex-1 relative">
      <img
        src={image.filePath}
        alt={`Cabin ${name}`}
        className="object-cover flex-1 border-r border-primary-800 h-[209px]"
      />
    </div>
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
         {admin.role === 'admin' ? <span className='bg-primary-950 border-t border-t-primary-800 text-left'>
          <Link to={`/cabins/Edit/${_id}`}> <PencilIcon className='border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-white h-14'/> </Link>
          </span> : null }
          <Link
            to={`/cabins/${_id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
