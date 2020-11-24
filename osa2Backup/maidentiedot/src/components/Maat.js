import React, { useState } from 'react';

const Maat = (props) => {

  console.log(props.maat);
  
  if (props.maat.length === 0) {
    return (
      <div>No countries found</div>
    )
  }

  if (props.maat.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if ( props.maat.length > 1 && props.maat.length < 11) {
    return (
      <div>
        {props.maat.map(maa => 
        <div key={maa.alpha3Code}>
          <Info key={maa.alpha3Code} maa={maa} />
        </div >
      )}
      </div>
    )
  }

  // Tee uusi componentti maa joka sisältää tiedot nimen jälkeen, 
  // ja näytetään vain jos showMaa === true?
  if ( props.maat.length === 1) {
    return (
      <div>
      {props.maat.map(maa => 
        <div>
          <div>
            <h1 key={maa.name}>{maa.name}</h1>
          </div>
          Capital {maa.capital} <br/>
          Population {maa.population}
          <h2>Languages</h2>
          {maa.languages.map(lang => 
            <ul key={lang.iso639_2}>{lang.name}</ul>  
          )}
          <div>
            <img style={{height:'100px'}} src={maa.flag} alt={""}/> 
          </div>
        </div>
      )}      
      </div>
    )
  }
};

const Info = ({maa}) => {
  const [showInfo, setShowInfo] = useState(false);

  const label = showInfo
    ? "Hide" : "Show"

  const naytaExtra = () => {
    setShowInfo(!showInfo);
  }

  return (
    <div>
      <p key={maa.name}>{maa.name}<button onClick={() => naytaExtra()}>{label}</button></p>
      { showInfo ? 
        <div>  
          Capital {maa.capital} <br/>
          Population {maa.population}
          <h2>Languages</h2>
          {maa.languages.map(lang => 
            <ul key={lang.iso639_2}>{lang.name}</ul>  
          )}
          <div>
            <img style={{height:'100px'}} src={maa.flag} alt={""}/> 
          </div>
        </div>
         : null}
    </div>
  )
}

export default Maat;