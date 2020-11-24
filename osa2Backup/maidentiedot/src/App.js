import React, { useState, useEffect } from 'react';
import axios from "axios";
import Filter from "./components/Filter";
import Maat from "./components/Maat"

function App() {
  const [maat, setMaat] = useState([]);
  const [ searchValue, setSearchValue ] = useState("");
  const [ showAll, setShowAll ] = useState(true);


  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setMaat(response.data)
      })
  }
  useEffect(hook, [])
  
  const handleSearchChange = (event) => {
    if (event.target.value === "") setShowAll(true);

    setSearchValue(event.target.value);
    setShowAll(false);
  }

  const maatToShow = showAll
  ? maat
  : maat.filter(maa => maa.name.toLowerCase().match(searchValue.toLowerCase()))


  return (
    <div>
      <Filter search={searchValue} onChange={handleSearchChange}/>
      <Maat maat={maatToShow} />
    </div>
  );
}

export default App;
