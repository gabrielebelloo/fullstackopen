import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Display = ({text, value, aftertext}) => <div>{text} {value} {aftertext}</div>

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const increaseGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedAll = updatedGood + neutral + bad;
    setAll(updatedAll);
    setAverage((updatedGood - bad) / updatedAll);
    setPositive(updatedGood / updatedAll * 100);
  }

  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedAll = good + updatedNeutral + bad;
    setAll(updatedAll);
    setPositive(good / updatedAll * 100);
  }

  const increaseBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedAll = good + neutral + updatedBad;
    setAll(updatedAll);
    setAverage((good - updatedBad) / updatedAll);
    setPositive(good / updatedAll * 100);
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <h1>statistics</h1>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text= 'bad' value={bad} />
      <Display text='all' value={all} />
      <Display text='average' value={average} />
      <Display text='positive' value={positive} aftertext=' %'/>
    </>
  )
}

export default App
