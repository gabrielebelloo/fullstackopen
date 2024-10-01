import Numbers from "./components/Numbers";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const found = persons.find((person) => person.name === newPerson.name);

    if (!found) {
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
      setFilteredPersons(newPersons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleInputSearch = (event) => {
    const searchInput = event.target.value;
    setNewSearch(searchInput);
    if (newSearch) {
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
      <div>
        search: <input onChange={handleInputSearch} value={newSearch} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleInputName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleInputNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Numbers persons={filteredPersons} />
      </ul>
    </>
  );
};

export default App;
