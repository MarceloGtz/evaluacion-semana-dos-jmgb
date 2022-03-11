import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // API
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState(0)
  const [isMetric, setIsMetric] = useState(true)

  const success = pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=40c38ae2279823921c8e5490f120dec6&units=metric`)
      .then(res => {
        setWeather(res.data)
        setTemperature(res.data.main.temp)
      }
      );

  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  const convertTemperature = () => {
    if (isMetric) {
      setTemperature(Math.round((temperature * 9/5) + 32 ));
      setIsMetric(false);
    } else {
      setTemperature(Math.round((temperature - 32) * 5/9));
      setIsMetric(true);
    }
  };
  console.log(weather)
  return (
    <div className="App">
      <h1>Weather App</h1>
      <hr />
      <h3>{weather.name}, {weather.sys?.country}</h3>

      <div className="App-data">

        <div className="App-icon">
          <div><b>Description: </b> <p>{weather.weather?.[0].main}, {weather.weather?.[0].description}</p></div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="Weather Icon"/>
          {/* TEMPERATURE */}
          <p>{temperature} {isMetric ? "°C" : "°F"}</p>
        </div>

        <div className="App-info">
          <div><b>Wind Speed: </b> <p>{weather.wind?.speed} m/s</p></div>
          <div><b>Humidity: </b> <p>{weather.main?.humidity}%</p></div>
          <div><b>Pressure: </b> <p>{weather.main?.pressure} mb</p></div>
        </div>

      </div>

      <button onClick={convertTemperature}>Change ° C / ° F </button>

      <hr />
      <p>Jesús Marcelo Gutiérrez Bravo</p>
    </div>
  );
}

export default App;
