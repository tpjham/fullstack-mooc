import React from 'react';

const PersonForm = (props) => {
  return (
    <div>
    <div>
      <h2>Add new person</h2>
    </div>
    <form onSubmit={props.onSubmit}>
      <div> Name: <input 
        value={props.name}
        onChange={props.onNameChange}
      /></div>
      <div> Number: <input
        value={props.number}
        onChange={props.onNumberChange}
      /></div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
    </div>
  );
};

export default PersonForm;