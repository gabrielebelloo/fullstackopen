const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <h4>Total of {sum} exercises</h4>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}    
  </>

const Course = ({ course }) => {
  const parts = course.parts
  const exercisesTotal = parts.reduce((sum, part) => sum = sum + part.exercises, 0)

  return (
    <>
      <Header name={course.name}/>
      <Content parts={parts}/>
      <Total sum={exercisesTotal} />
    </>
  )
}

export default Course