import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import LocationWeather from './components/LocationWeather'
const api = {
  key: "5ef8d679c6f2e0c25241e354a96f4d6b",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const locationTrue = typeof weather.main != "undefined"; 

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const weatherType = weather => {
    const mainWeather = weather.weather[0].main;
    switch(mainWeather) {
      case "Clouds": 
        return "main clouds";
        break;
      case "Rain": 
        return "main rain";
        break; 
      case "Thunderstorm": 
        return "main thunderstrom";
        break;
      case "Clear": 
        return "main clear";
        break;
      case "Snow": 
        return "main snow";
        break;
      case "Fog": 
        return "main fog"
        break;
    }
  }

  return (
    <div className="app">
      <main className={locationTrue ? (weatherType(weather)) : "main" }>
        <div className="opacity">
          <SearchBox 
            query={query} 
            search={search} 
            setQuery={setQuery}
          />
          {locationTrue ? (
            <LocationWeather 
              weather={weather}
              dateBuilder={dateBuilder}
            />
          ) : ""}
        </div>
      </main>
    </div>
  );
}

export default App;
