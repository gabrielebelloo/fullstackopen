import person from "../services/person";

const Number = ({ person, remove }) => (
  <li>
    {person.name} - {person.number}
    <button onClick={() => {remove(person)}}>delete</button>
  </li>
);

const Numbers = ({ persons, remove }) => {
  return persons.map((person) => <Number remove={remove} key={person.id} person={person} />);
};

export default Numbers;
