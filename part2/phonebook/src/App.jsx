import Numbers from "./components/Numbers";
import { useState, useEffect } from "react";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
    });
  });

  const addPerson = (name, number) => {
    const newPerson = {
      name: name,
      number: number,
    };
    const found = persons.find((person) => person.name === newPerson.name);

    if (!found) {
      personService.create(newPerson).then((newPerson) => {
        const newPersons = persons.concat(newPerson);
        setPersons(newPersons);
        setFilteredPersons(newPersons);
      });
    } else {
      alert(`${name} is already added to phonebook`);
    }
  };

  const handleInputSearch = (searchInput) => {
    if (searchInput) {
      setFilteredPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilteredPersons(persons);
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleInputSearch={handleInputSearch} />
      <h3>Add a new</h3>
      <Form addPerson={addPerson} />
      <h2>Numbers</h2>
      <ul>
        <Numbers persons={filteredPersons} />
      </ul>
    </>
  );
};

export default App;

const Filter = ({ handleInputSearch }) => {
  const [newSearch, setNewSearch] = useState("");

  const handleInput = (event) => {
    const input = event.target.value;
    setNewSearch(input);
    handleInputSearch(input);
  };

  return (
    <div>
      search: <input onChange={handleInput} value={newSearch} />
    </div>
  );
};

const Form = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    addPerson(newName, newNumber);
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        name:{" "}
        <input onChange={(e) => setNewName(e.target.value)} value={newName} />
      </div>
      <div>
        number:
        <input
          onChange={(e) => setNewNumber(e.target.value)}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
