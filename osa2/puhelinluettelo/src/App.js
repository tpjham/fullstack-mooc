import React, {useState} from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    
    for (const key of persons) {
      if ( key.name === newName ) {
        alert(`${newName} already exists in the phonebook`)
        return;
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  }

  const namesToShow = () => 
    ? notes
    : notes.filter(note => note.important === true);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input 
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>
      <form onSubmit={addPerson}>
        <div> Name: <input 
          value={newName}
          onChange={handleNameChange}
        /></div>
        <div> Number: <input
          value={newNumber}
          onChange={handleNumberChange}
        /></div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name}    {person.number}</p>
      )}
    </div>
  )
}

export default App;

/*
import React, {useState} from "react";

const ChangePlayerName = () => {
  const [username, setUsername] = useState("")

  const doTheStuff = (event) => {
    callTheEventForWhatever();
  }

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  }

  return ( 
    <div>
      <form>
        <div>
          <Input
              id="username"
              placeholder="Username"
              onChange={handleUserNameChange}
          ></Input>
        </div>
        <div>
        <Button id="SetPlayerName" onClick={(event) => this.doTheStuff(event)}>
            Set Name
        </Button>
        </div>
      </form>
    </div>
  )
} */
