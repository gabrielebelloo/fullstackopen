import Numbers from './components/Numbers'
import { useState } from 'react'

const App  = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [newName, setNewName] = useState('add name')

  const addPerson = (event) => {
    event.preventDefault()
    const newPersons = persons.concat({
      name: newName,
      id: persons.length + 1
    })
    setPersons(newPersons)
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