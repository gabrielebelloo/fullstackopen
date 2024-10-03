import CountryDetail from "./CountryDetail";
import { useState } from "react";

const CountriesList = ({ filteredCountries }) => {
  const [country, setCountry] = useState({});

  if (filteredCountries.length < 10 && filteredCountries.length !== 1) {
    return (
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))}
      </ul>
    );
  } else if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default CountriesList;
