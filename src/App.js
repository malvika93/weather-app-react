import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=48d3607ae8907b2e2d9eab74db18eab0`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setError(null);
        })
        .catch(setError);
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {error && (
        <div className="container">
          <p className="bold">Please enter correct city name.</p>
        </div>
      )}

      {!error && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p className="bold">
                {data.name}
                {data.sys ? ", " + data.sys.country : null}
              </p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp}&deg;C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? (
                <p className="bold">{data.weather[0].main}</p>
              ) : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold"> {data.main.feels_like}&deg;C</p>
                ) : null}
                <p className="bold">Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p className="bold">Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed} MPH</p>
                ) : null}
                <p className="bold">Wind Speed</p>
              </div>
              <div className="sunrise">
                {data.sys ? <p className="bold">{moment.unix(data.sys.sunrise).format("hh:mm A")}</p> : null}
                <p className="bold">Sunrise</p>
              </div>
              <div className="sunset">
                {data.sys ? <p className="bold">{moment.unix(data.sys.sunset).format("hh:mm A")}</p> : null}
                <p className="bold">Sunset</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
