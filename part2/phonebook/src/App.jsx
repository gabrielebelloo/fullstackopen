import Numbers from './components/Numbers'
import { useState } from 'react'

const App  = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      id: persons.length + 1
    }
    const found = persons.find((person) => person.name === newPerson.name)

    if (!found) {
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleInput} value={newName}/>
        </div>
        <div>
          <button type='submit'>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Numbers persons={persons}/>
      </ul>
    </>
  )
}

export default App