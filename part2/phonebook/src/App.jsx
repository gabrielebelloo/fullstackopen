import Numbers from "./components/Numbers";
import { useState, useEffect } from "react";
import personService from "./services/person";
import person from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersonsStates(persons);
    });
  }, []);

  const addPerson = (name, number) => {
    const newPerson = {
      name: name,
      number: number,
    };
    const found = persons.find((person) => person.name === newPerson.name);

    if (!found) {
      personService.create(newPerson).then((newPerson) => {
        const newPersonsObj = persons.concat(newPerson);
        setPersonsStates(newPersonsObj);
      });
    } else {
      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(found.id, newPerson).then((newPerson) => {
          const newPersonsObj = persons.map((person) =>
            person.id !== found.id ? person : newPerson
          );
          setPersonsStates(newPersonsObj);
        });
      }
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

  const removePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}`)) {
      personService.remove(person.id).then((res) => {
        const newPersonsObj = persons.filter((person) => person.id !== res.id);
        setPersonsStates(newPersonsObj);
      });
    }
  };

  const setPersonsStates = (newPersonsObj) => {
    setPersons(newPersonsObj);
    setFilteredPersons(newPersonsObj);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleInputSearch={handleInputSearch} />
      <h3>Add a new</h3>
      <Form addPerson={addPerson} />
      <h2>Numbers</h2>
      <ul>
        <Numbers remove={removePerson} persons={filteredPersons} />
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
