import { useState, useEffect } from "react";
import "./App.css";
import countriesService from "./services/countries";
import CountriesList from "./components/CountriesList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    countriesService
      .getAll()
      .then((res) => {
        setCountries(res);
        setFilteredCountries(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInput = (e) => {
    const input = e.target.value;
    setSearch(input);
    if (input) {
      const newFilteredCountries = countries.filter((country) => {
        const countryName = country.name.common.toLowerCase();
        if (countryName.includes(input.toLowerCase())) {
          return country;
        }
      });
      setFilteredCountries(newFilteredCountries);
    } else {
      setFilteredCountries(countries);
    }
  };

  const showSelectedCountry = (country) => {
    setFilteredCountries([country]);
    setSearch(country.name.common);
  }

  return (
    <>
      <div>
        find countries: <input value={search} onChange={handleInput} />
      </div>
      <CountriesList filteredCountries={filteredCountries} showSelectedCountry={showSelectedCountry} />
    </>
  );
}

export default App;
