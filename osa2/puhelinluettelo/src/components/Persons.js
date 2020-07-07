import React from 'react';

const Persons = (props) => {
  return (
    <div>
    <h2>Numbers</h2>
    {props.persons.map(person => 
      <p key={person.name}>{person.name}    {person.number}</p>
    )}      
    </div>
  );
};

export default Persons;