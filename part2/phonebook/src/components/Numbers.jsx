const Number = ({person}) => <li>{person.name}</li>

const Numbers = ({persons}) => {
  return (
    persons.map((person) => <Number key={person.id} person={person} />)
  )
}

export default Numbers