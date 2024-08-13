
// Let's imagine your colleague already built this component 😃

import { useEffect, useState } from "react";
import { getCountries } from "../Services/Services";

 function SelectCountry({ defaultCountry, name, id, className,onChange }) {
  const [flag,setFlag]=useState('')
  const [countries,setCountries]=useState([])

  useEffect(()=>{
   async function fetchContries(){
    const countries = await getCountries();
    setCountries(countries)
    const flag =
      countries.find((country) => country.name === defaultCountry)?.flag ?? '';
      setFlag(flag)
    }
    fetchContries()
  },[defaultCountry])
 

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
      onChange={onChange}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
