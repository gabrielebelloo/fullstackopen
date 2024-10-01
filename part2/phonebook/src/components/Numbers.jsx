const Number = ({ person }) => (
  <li>
    {person.name} - {person.number}
  </li>
);

const Numbers = ({ persons }) => {
  return persons.map((person) => <Number key={person.id} person={person} />);
};

export default Numbers;
