import React, {useState} from "react";
import ReactDOM from "react-dom";
/* Ensimmäinen testi
const Hello = (props) => {
  const { name, age } = props;

  const bornYear = () => new Date().getFullYear() - age;

  return (
  <div>
    <p>Hello {props.name}, you are {props.age} years old</p>
    <p>
      So you were probably born {bornYear()}
    </p>
  </div>
)};

const App = () => {
  const nimi = "Pekka";
  const ika = 10;

  return (
  <div>
    <h1>Greetings</h1>
    <Hello name="Maya" age={26+10}/>
    <Hello name={nimi} age = {ika}/>
  </div>
)};

ReactDOM.render(<App />, document.getElementById("root")); */

// -------------------------------------------------------------------------------

/* Toinen testi
const App = (props) => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);
  
  return ( 
    <div>
      <Display counter={counter} />
      <Button 
        handleClick={increaseByOne} 
        text="Plus"
      />
      <Button 
        handleClick={setToZero} 
        text="Zero"
      />
      <Button 
        handleClick={decreaseByOne} 
        text="Minus"
      />
    </div>
  ) 
};

const Display = ({counter}) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  );

let counter = 1;

ReactDOM.render(
  <App counter={counter} />,
  document.getElementById("root")
); */

// ------------------------------------------------------------------------------

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"))
    setLeft(left + 1)
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"))
    setRight(right + 1)
  };

  return ( 
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="Left" />
        <Button onClick={handleRightClick} text="Right" />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
};

const Display = props => <div>{props.value}</div>

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return ( 
      <div>
        The App is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      Button press history: {allClicks.join(" ")}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);