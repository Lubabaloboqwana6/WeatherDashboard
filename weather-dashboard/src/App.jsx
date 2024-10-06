import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = "7ab72dddb949bafe004e66ba21fdf7f4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app w-full h-screen relative bg-[#00000066] text-white ">
      <div className="search text-center p-4  ">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          className="py-3 px-6 text-xl rounded-[25px] border border-[#ffffffcc] border-solid bg-[#ffffff33] "
        />
      </div>
      <div className="container max-w-[700px] h-[700px] m-auto pt-0 pb-0 px-4 flex flex-col justify-between">
        <div className="top w-full m-4 mx-auto">
          <div className="locatation">
            <p className="text-2xl">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1 className="text-8xl font-bold">{data.main.temp}°C</h1>
            ) : null}
          </div>
          <div className="description relative right-[-90%] origin-top-left rotate-270 ">
            {data.weather ? (
              <p className="text-2xl font-bold">{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom flex justify-evenly text-center w-full my-4 mx-auto p-4 rounded-[12px] bg-[#ffffff33]">
            <div className="feels">
              {data.main ? (
                <p className="text-2xl font-bold">{data.main.feels_like}°C</p>
              ) : null}
              <p className="text-2xl">Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="text-2xl font-bold">{data.main.humidity}%</p>
              ) : null}

              <p className="text-2xl">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="text-2xl font-bold">{data.wind.speed}MPH</p>
              ) : null}

              <p className="text-2xl">Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
