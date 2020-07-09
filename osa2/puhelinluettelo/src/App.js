import React, {useState, useEffect} from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import pplService from "./services/people"

const App = () => {
  const [ persons, setPersons  ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ searchValue, setSearchValue ] = useState("");
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    pplService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    
    for (const key of persons) {
      if ( key.name === newName ) {
        if (window.confirm(`${newName} already exists in the phonebook, would you like to replace the old number with the new one?`)) {
          const person = persons.find(p => p.name === newName)
          const changedPerson = {...person, number: newNumber}
      
          pplService
            .update(person.id, changedPerson)
            .then(response => {
              setPersons(persons.map(person => person.name !== newName ? person : response.data))
            })
            .catch(error => {
              alert(
                `The person "${person.name}" was already deleted from the server`
              )
              //setPersons(persons.filter(p => p.name !== id))
            })
        return;
        }
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    pplService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("");
        setNewNumber("");
      })
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

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)


    if ( window.confirm(`Do you really want to delete ${person.name} from the phonebook?` )) {
      pplService
      .deleteDude(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(
          `The person "${person.name}" was already deleted from the server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter search={searchValue} onChange={handleSearchChange}/>
        <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} onSubmit={addPerson} />
        <h2>Numbers</h2>
        {namesToShow.map((person, i) =>
          <Persons key={i} persons={person}
          deletePerson={() => deletePerson(person.id)} />
        )}
      </div>
  );
}

export default App;