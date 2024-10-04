import Numbers from "./components/Numbers";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [errorMessage, setNewMessage] = useState({
    content: "",
    isError: false,
  });

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
        showMessage(`${newPerson.name} added.`, false);
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
          showMessage(`${found.name}'s phone number changed.`, false);
        });
      }
    }
  };

  const showMessage = (content, isError) => {
    setNewMessage({ content, isError });
    setTimeout(() => setNewMessage({ content: null, isError: false }), 5000);
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

  const removePerson = (personToRemove) => {
    if (window.confirm(`Do you really want to delete ${personToRemove.name}`)) {
      personService
        .remove(personToRemove.id)
        .then((res) => {
          const newPersonsObj = persons.filter(
            (p) => p.id !== personToRemove.id
          );
          setPersonsStates(newPersonsObj);
          showMessage(`${personToRemove.name} removed.`, false);
        })
        .catch((err) => {
          showMessage(`${personToRemove.name} has already been removed.`, true);
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
      <Notification message={errorMessage} />
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
