import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const MostVoted = ({anecdotes, votes, mostVotedIndex}) => {
  const totalVotes = votes.reduce((pv, cv) => pv + cv, 0);
  if (!totalVotes) {
    return (
      <>
        <h1>Anecdote with most votes</h1>
        <p>Still not voted</p>
      </>
    )
  }

  return (
    <>
    <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {votes[mostVotedIndex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(new Array(8).fill(0));

  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const nextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber);
  }

  const vote = (selected) => {
    const updatedVotes = [...votes]
    updatedVotes[selected] = updatedVotes[selected] + 1;
    setVotes(updatedVotes);
    const updatedMostVotedIndex = indexOfMax(updatedVotes);
    setMostVotedIndex(updatedMostVotedIndex);
  }

  const indexOfMax = (array) => {
    let maxIndex = 0;
    for (let i = 1; i < array.length; i++) {
      if (array[i] > array[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => vote(selected)} text='vote' />
      <Button handleClick={nextAnecdote} text='next anecdote' />
      <MostVoted anecdotes={anecdotes} votes={votes} mostVotedIndex={mostVotedIndex}/>
    </>
  )
}

export default App
