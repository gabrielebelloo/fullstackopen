const CountryDetail = ({ country }) => {

  return <>
    <h2>{country.name.common}</h2>
    <div>Capital: {country.capital[0]}</div>
    <div>Area: {country.area}</div>
    <h3>Languages:</h3>
    <ul>
        {Object.values(country.languages).map((language, index) => {
           return <li key={index}>{language}</li>
        })}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}></img>
    <h3>Weather in {country.capital[0]}</h3>
    <div>Temperature: {}</div>
    <div>Wind: {}</div>
  </>;
};

export default CountryDetail;
