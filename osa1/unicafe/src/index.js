import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  return ( 
    <div>
      <div>
        <h1>Give Feedback</h1>
      </div>
      <div>
        <Button onClick={() => setGood(good + 1)} text="Good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"/>
        <Button onClick={() => setBad(bad + 1)} text="Bad"/>
      </div>
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  
  if ( all === 0 ) return ( 
    <div>
      No feedback given
    </div>
  )

  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="All" value={all} />
        <StatisticsLine text="Average" value={( good * 1  - bad * 1) / all} />
        <StatisticsLine text="Positive" value={good / all * 100} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({text, value}) => {

  if ( text === "Positive") return (
    <tr>
      <td>
        {text}  
      </td>
      <td>
        {value} %
      </td>
    </tr>
  )
  
  return (
    <tr>
      <td>
        {text}    
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
