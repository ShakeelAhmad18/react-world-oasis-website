import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCabin } from '../Services/Services';
import TextExpander from './TextExpander';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Spinner from './Spinner';
import Reservation from './Reservation'

export default function CabinDetails() {
  const [cabin, setCabin] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    async function fetchCabin() {
      try {
        const res = await getCabin(id);
        const cabinData = res.data;
        setCabin(cabinData);
      } catch (error) {
        console.error('Error fetching cabin:', error);
      }
    }
    fetchCabin();
  }, [id]);

  if (!cabin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <img
            src={cabin.image?.filePath}
            className="object-cover"
            alt={`Cabin ${cabin.name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {cabin.name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{cabin.description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{cabin.maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner/>}>
        <Reservation cabin={cabin} id={id}/>
       </Suspense>
      </div>
    </div>
  );
}
