import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value, aftertext}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value} {aftertext}</td>
    </tr>
  )
}
const Statistics = ({statistics}) => {
    if (!statistics.all) return <p>No feedback given</p>
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={statistics.good} />
            <StatisticLine text='neutral' value={statistics.neutral} />
            <StatisticLine text= 'bad' value={statistics.bad} />
            <StatisticLine text='all' value={statistics.all} />
            <StatisticLine text='average' value={statistics.average} />
            <StatisticLine text='positive' value={statistics.positive} aftertext=' %'/>
          </tbody>
        </table>
      </>
    )
}

const App = () => {
  const [ statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  });

  const increaseGood = () => {
    const updatedGood = statistics.good + 1;
    const updatedAll = updatedGood + statistics.neutral + statistics.bad;
    const updatedAverage = (updatedGood - statistics.bad) / updatedAll;
    const updatedPositive = (updatedGood / updatedAll * 100);
    const newStatistics = {
      ...statistics,
      good: updatedGood,
      all: updatedAll,
      average: updatedAverage,
      positive: updatedPositive
    };
    setStatistics(newStatistics);
  }

  const increaseNeutral = () => {
    const updatedNeutral = statistics.neutral + 1;
    const updatedAll = statistics.good + updatedNeutral + statistics.bad;
    const updatedAverage = (statistics.good - statistics.bad) / updatedAll;
    const updatedPositive = statistics.good / updatedAll * 100;
    const newStatistics = {
      ...statistics,
      neutral: updatedNeutral,
      all: updatedAll,
      average: updatedAverage,
      positive: updatedPositive
    };
    setStatistics(newStatistics);
  }

  const increaseBad = () => {
    const updatedBad = statistics.bad + 1;
    const updatedAll = statistics.good + statistics.neutral + updatedBad;
    const updatedAverage = (statistics.good - updatedBad) / updatedAll;
    const updatedPositive = statistics.good / updatedAll * 100;
    const newStatistics = {
      ...statistics,
      bad: updatedBad,
      all: updatedAll,
      average: updatedAverage,
      positive: updatedPositive
    };
    setStatistics(newStatistics);
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics statistics={statistics}/>
    </>
  )
}

export default App
