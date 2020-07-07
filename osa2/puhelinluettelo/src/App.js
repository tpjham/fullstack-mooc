import React, {useState, useEffect} from 'react';
import axios from "axios";
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [ persons, setPersons  ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ searchValue, setSearchValue ] = useState("");
  const [ showAll, setShowAll ] = useState(true);

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault();
    
    for (const key of persons) {
      if ( key.name === newName ) {
        alert(`${newName} already exists in the phonebook`)
        setNewName("");
        setNewNumber("");
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

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().match(searchValue.toLowerCase()))

  const handleNameChange = (event) => {
    
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    if (event.target.value === "") setShowAll(true);

    setSearchValue(event.target.value);
    setShowAll(false);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={searchValue} onChange={handleSearchChange}/>
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <Persons persons={namesToShow} />
    </div>
  )
}

export default App;