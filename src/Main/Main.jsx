import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AirIcon from "@mui/icons-material/Air";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Main = () => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const apikey = "91afa79df702866de1a41318e83dc6f3";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=${apikey}`;
  let imageUrl = "";

  async function checkWeather() {
    try {
      const response = await fetch(apiUrl + `&q=${city ? city : "kolkata"}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
        alert("Faild to fetch")
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      alert("Failed to fetch weather data. Please try again later.");
    }
  }

 useEffect(()=>{
   checkWeather();
 },[])

  const getSunriseTime = () => {
    if (weatherData && weatherData.city && weatherData.city.sunrise) {
      const sunriseTime = new Date(weatherData.city.sunrise * 1000);
      return sunriseTime.toLocaleTimeString();
    }
    return "";
  };

  const getSunsetTime = () => {
    if (weatherData && weatherData.city && weatherData.city.sunset) {
      const sunsetTime = new Date(weatherData.city.sunset * 1000);
      return sunsetTime.toLocaleTimeString();
    }
    return "";
  };

  const handleCity = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };
  const handleSearch = () => {
    checkWeather();
      setCity('')
  };
  const weatherTimezoneOffset = (weatherData?.city?.timezone ?? 0); // Convert seconds to milliseconds
  const currentTime = new Date(Date.now() + (weatherTimezoneOffset + (6.5 * 3600)) * 2000); // Adjust current time based on timezone offset and 5 hours 30 minutes
  const currentHour = currentTime.getHours();  // Get current hour in UTC
  let cityTime = currentTime.toLocaleTimeString();
console.log(currentTime);
  let weatherCondition = weatherData?.list[0]?.weather[0]?.description;

  const weatherImagesDay = {
    "few clouds": "https://cdn3d.iconscout.com/3d/premium/thumb/cloud-with-sun-5505574-4596393.png?f=webp",
    "clear sky": "https://png.pngtree.com/png-clipart/20221002/ourmid/pngtree-realistic-sun-3d-icon-render-png-image_6258912.png",
    "broken clouds": "https://static.vecteezy.com/system/resources/previews/022/030/212/original/cloudy-with-sun-sunny-day-concept-3d-sun-with-clouds-weather-icon-png.png",
    "overcast clouds": "https://static.vecteezy.com/system/resources/thumbnails/022/287/823/small/3d-rendering-sun-covered-by-clouds-icon-3d-render-cloudy-weather-with-sun-icon-sun-covered-by-clouds-png.png",
    "light rain": "https://static.vecteezy.com/system/resources/previews/010/851/545/original/3d-illustration-light-rain-png.png",
    "scattered clouds": "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-day-10289408-8425189.png?f=webp",
    "moderate rain": "https://static.vecteezy.com/system/resources/thumbnails/010/855/680/small_2x/3d-illustration-heavy-rain-png.png",
  };
  const weatherImagesNight = {
    "few clouds": "https://cdn3d.iconscout.com/3d/premium/thumb/starry-cloudy-night-sky-10514805-8460062.png",
    "clear sky": "https://www.freeiconspng.com/thumbs/moon-png/moon-png-hd-2.png",
    "broken clouds": "https://static.vecteezy.com/system/resources/thumbnails/022/985/390/small_2x/ramadan-crescent-moon-and-stars-3d-icon-illustration-png.png",
    "overcast clouds": "https://static.vecteezy.com/system/resources/thumbnails/024/984/206/small_2x/3d-weather-forecast-icons-white-clouds-in-the-rainy-season-with-strong-winds-and-rain-png.png",
    "light rain": "https://static.vecteezy.com/system/resources/thumbnails/024/984/100/small_2x/3d-weather-forecast-icons-black-cloud-with-thunder-from-a-rainstorm-3d-illustration-png.png",
    "scattered clouds": "https://static.vecteezy.com/system/resources/thumbnails/024/984/073/small_2x/3d-weather-forecast-icons-black-cloud-with-thunder-from-a-rainstorm-3d-illustration-png.png",
    "moderate rain": "https://static.vecteezy.com/system/resources/thumbnails/010/855/680/small_2x/3d-illustration-heavy-rain-png.png",
    // Add more weather conditions and their corresponding image URLs here
  };

  let gradientColor = "";
  if (currentHour >= 6 && currentHour < 12) {
    gradientColor = "bg-gradient-to-r from-blue-500 to-blue-800"; // Morning
    imageUrl = weatherImagesDay[weatherCondition] || "https://png.pngtree.com/png-clipart/20221002/ourmid/pngtree-realistic-sun-3d-icon-render-png-image_6258912.png"; // Default morning image
  } else if (currentHour >= 12 && currentHour < 16) {
    gradientColor = "bg-gradient-to-r from-blue-500 to-blue-800"; // Afternoon
    imageUrl = weatherImagesDay[weatherCondition] || "https://static.vecteezy.com/system/resources/previews/019/922/824/original/illustration-of-3d-sun-icon-png.png"; // Default morning image
  } else if (currentHour >= 16 && currentHour < 18) {
    gradientColor = "bg-gradient-to-br from-orange-300 to-blue-800";
    imageUrl = weatherImagesDay[weatherCondition] || "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-512.png"; // Default morning image
  } else if (currentHour >= 18 && currentHour < 24) {
    gradientColor = "bg-gradient-to-r from-blue-700 to-gray-800";
    imageUrl = weatherImagesNight[weatherCondition] || "https://cdn3d.iconscout.com/3d/premium/thumb/night-6906833-5668682.png"; // Default morning image
  } else if (currentHour <= 24 && currentHour < 6) {
    gradientColor = "bg-gradient-to-r from-blue-700 to-gray-900";
    imageUrl = weatherImagesNight[weatherCondition] || "https://cdn3d.iconscout.com/3d/premium/thumb/night-hail-6578537-5529267.png"; // Default morning image
  } else {
    gradientColor = ""; // Evening/Night
  }
  
  return (
    <>
      <div className={`card ${gradientColor} font-custom bg-black max-sm:h-full text-white h-full w-full flex  flex-col items-center pt-8`}>
        <div className="search w-96 max-sm:w-auto md:w-1/2 flex items-center justify-between">
          <input
            type="text"
            placeholder="enter city name"
            value={city}
            onChange={handleCity}
            spellCheck="false"
            className="bg-white text-gray-800 px-5 py-4 rounded-full flex-1 mr-2"
          />
          <button onClick={handleSearch}>
            <Tooltip title="Search..">
              {" "}
              <button>
                <img
                  src="https://cdn-icons-png.flaticon.com/256/10051/10051043.png"
                  alt=""
                  className="h-11"
                />
              </button>{" "}
            </Tooltip>
          </button>
        </div>
        <div className="flex max-sm:flex-col justify-center">
          <img
            src={imageUrl}
            alt=""
            className="h-36 w-36  mx-auto"
          />
          <div className="pt-6 flex justify-center">
            <h2 className="text-5xl">
              {weatherData
                ? `${Math.round(weatherData.list[0].main.temp)}°C`
                : ""}
              &nbsp;
            </h2>
          </div>
        </div>
            <h2 className="text-xl">
            {weatherCondition}
            </h2>
        <h1 className="text-2xl p-4">
          <strong>Feels like :</strong>{" "}
          {weatherData
            ? `${Math.round(weatherData.list[0].main.feels_like)}°C`
            : ""}
        </h1>
        <h1 className="text-2xl ">
          <LocationOnIcon className="-mt-2" /> &nbsp;
        {weatherData
          ? `${(weatherData.city.name)} `
          : ""}
        </h1>
        {cityTime}
        {/* <h1 className="text-2xl">{new Date().getTime}</h1> */}
        <div></div>
        {/* cards */}
        <div className="forecast mt-8 flex max-sm:flex-col max-sm:w-72 bg-opacity-20 backdrop-filter backdrop-blur-lg backdrop-saturate-150 ... bg-orange-300 p-4 rounded-md  md:space-x-11">
          {weatherData &&
            weatherData.list &&
            weatherData.list
              .filter((forecast, index) => index % 8 === 0)
              .slice(0, 6)
              .map((forecast, index) => (
                <div className="day text-center" key={index}>
                  <h3 className="text-lg font-semibold">
                    {index === 0
                      ? "Today"
                      : index === 1
                      ? "Tomorrow"
                      : new Date(forecast.dt * 1000).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                          }
                        )}
                  </h3>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt="weather-icon"
                    className="w-16 mx-auto"
                  />
                  <p className="text-lg">{Math.round(forecast.main.temp)}°C </p>
                  <p>{forecast.weather[0].description}</p>
                </div>
              ))}
        </div>
        <div className="flex justify-center w-3/4 md:space-x-36 mt-6 px-4">
          <div className="flex flex-col justify-around items-center">
            <h1 className="text-md p-3">
              <strong>
                <WaterDropOutlinedIcon />
                Humidity :
              </strong>{" "}
              {weatherData ? `${weatherData.list[0].main.humidity}%` : ""}
            </h1>
            <h2 className="text-md p-3">
              <strong>
                <WbTwilightOutlinedIcon />
                &nbsp; Sunrise : 
              </strong>{" "}
              {getSunriseTime()}
            </h2>
          </div>
          <div className="flex flex-col items-center ">
            <h1 className="text-md p-3">
              <strong>
                <AirIcon /> &nbsp; Wind:
              </strong>{" "}
              {weatherData
                ? `${Math.round(weatherData.list[0].wind.speed * 3.6)} km/hr`
                : ""}
            </h1>
            <h2 className="text-md p-3">
              <strong>
                <WbSunnyOutlinedIcon />
                &nbsp; Sunset :
              </strong>{" "}
              {getSunsetTime()}
            </h2>
          </div>
        </div>
        <footer className="text-center text-gray-400 text-xs py-4">
          &copy; {new Date().getFullYear()} Subhajit Bhukta
        </footer>
      </div>
    </>
  );
};

export default Main;
