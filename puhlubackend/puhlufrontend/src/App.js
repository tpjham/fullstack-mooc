import React, {useState, useEffect} from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import pplService from "./services/people";
import Alert from "./components/Alert";

const App = () => {
  const [ persons, setPersons  ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ searchValue, setSearchValue ] = useState("");
  const [ showAll, setShowAll ] = useState(true);
  const [ message, setMessage ] = useState(null)
  const [ alertStyle, setAlertStyle ] = useState(null)

  useEffect(() => {
    pplService
      .getAll()
      .then(response => {
        setPersons(response)
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
              setPersons(persons.map(person => person.name !== newName ? person : response))
              setNewName("");
              setNewNumber("");
              setMessage(`Changed the number for ${newName}`)
              setAlertStyle("notification")
              setTimeout( () => {
                setMessage(null)
                setAlertStyle(null)
              }, 5000)
            })
            .catch(error => {
              setMessage(
                `Information of ${newName} has already been removed from the server`
              )
              setAlertStyle("error")
              setTimeout(() => {
                setMessage(null)
                setAlertStyle(null)
              }, 5000)
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
        setPersons(persons.concat(response))
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`)
        setAlertStyle("notification")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
        console.log(response)
      })
      .catch(error => {
        setMessage(`Validation failed: ${error.response.data.error}`)
        setAlertStyle("error")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
        console.log(error.response.data)
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
        setMessage(`Removed "${person.name}" from the phonebook`)
        setAlertStyle("error")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`The person "${person.name}" was already deleted from the server`)
        setAlertStyle("error")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Alert message={message} alertStyle={alertStyle} />
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