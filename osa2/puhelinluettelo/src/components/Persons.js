import React from 'react';

const Persons = (props) => {
  return (
    <div>
      <p>{props.persons.name}    {props.persons.number} 
      <button onClick={props.deletePerson}>Delete</button></p>
    </div>
  );
};

export default Persons;