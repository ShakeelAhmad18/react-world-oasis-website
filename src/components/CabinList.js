import React, { useEffect, useState } from 'react';
import CabinCard from './CabinCard';
import { getCabins } from '../Services/Services';

export default function CabinList({ filter }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cabins  = await getCabins();
        setData(cabins);
      } catch (error) {
        console.error('Error fetching cabins:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  let displayedCabins=data;

  if (filter === 'all') displayedCabins = data;
  if (filter === 'small') displayedCabins = data.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === 'medium') displayedCabins = data.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  if (filter === 'large') displayedCabins = data.filter((cabin) => cabin.maxCapacity >= 8);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message or spinner while fetching data
  }

  if (displayedCabins.length === 0) {
    return <div>No cabins available</div>; // Handle the case where no cabins match the filter
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin._id} />
      ))}
    </div>
  );
}
