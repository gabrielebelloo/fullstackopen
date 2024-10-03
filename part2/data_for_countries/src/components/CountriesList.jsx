import CountryDetail from "./CountryDetail";

const CountriesList = ({ filteredCountries, showSelectedCountry }) => {

  const selectCountry = (country) => {
    showSelectedCountry(country);
  }

  if (filteredCountries.length < 10 && filteredCountries.length !== 1) {
    return (
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => selectCountry(country)}>Show</button>
          </li>
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
