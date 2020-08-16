// HTML Elements
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const temperatureValueElement = document.querySelector(".temperature-value p");
const temperatureDescriptionElement = document.querySelector(
  ".temperature-description p"
);
const locationElement = document.querySelector(".location p");

// App Data
const weather = {};

weather.temperature = {
  unit: "fahrenheit",
};

// API Key
const key = "b93a26639b8af233ddd0bd2ecea99037";

// Checks if the browser supports geolocation
if ("geolocation" in navigator) {
  // Gets the user's location
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  // Makes the error visible
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML =
    "<p>Unfortunately, this Browser Doesn't Support Geolocation.</p>";
}

// Sets the user's position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// Show an error when there is an issue with geolocation service
function showError(error) {
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// Retrieve the weather from the API
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`;

  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeather();
    });
}

// Display the weather data to the UI
function displayWeather() {
  // Gets the appropriate icon corresponding to the icon code that comes back from the API
  // Credit to here:  https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  temperatureValueElement.innerHTML = `${weather.temperature.value} &#176; <span>F</span>`;
  temperatureDescriptionElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Fahrenheit to Celsius conversion
function fahrenheitToCelsius(temperature) {
  return ((temperature - 32) * 5) / 9;
}

// Temperature Value/Unit Change feature
temperatureValueElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit === "fahrenheit") {
    let celsius = fahrenheitToCelsius(weather.temperature.value);
    celsius = Math.floor(celsius);
    temperatureValueElement.innerHTML = `${celsius}&#176; <span>C</span>`;
    weather.temperature.unit = "celsius";
  } else {
    temperatureValueElement.innerHTML = `${weather.temperature.value}&#176; <span>F</span>`;
    temperature.value.unit = "fahrenheit";
  }
});

// window.addEventListener("load", () => {
//   let latitude;
//   let longitude;
//   let temperatureDescription = document.querySelector(
//     ".temperature-description"
//   );
//   let temperatureDegree = document.querySelector(".temperature-degree");
//   let locationCity = document.querySelector(".location-city");
//   let weatherIcon = document.querySelector(".weather-icon");
//   let temperatureSection = document.querySelector(".temperature");
//   let temperatureSpan = document.querySelector(".temperature span");

//   // This will only work is the user opts in to geolocation through the browser
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       latitude = position.coords.latitude;
//       longitude = position.coords.longitude;

//       // const edgewoodAPI = https://api.openweathermap.org/data/2.5/weather?lat=40.4346&lon=-79.8655&appid=b93a26639b8af233ddd0bd2ecea99037

//       // const proxy = "https://cors-anywhere.herokuapp.com/";
//       //const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b93a26639b8af233ddd0bd2ecea99037`;
//       const api = `https://api.openweathermap.org/data/2.5/weather?lat=40.4346&lon=-79.8655&units=imperial&appid=b93a26639b8af233ddd0bd2ecea99037`;

//       fetch(api)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           const temperature = Math.floor(data.main.temp);
//           const weatherDescription = data.weather[0].description;
//           const weatherIconID = data.weather[0].icon;

//           // Set DOM elements from the API
//           temperatureDegree.textContent = temperature;
//           temperatureDescription.textContent = weatherDescription;
//           locationCity.textContent = data.name;

//           // Gets the appropriate icon corresponding to the icon code that comes back from the API
//           // Credit to here:  https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
//           weatherIcon.innerHTML = `<img src="icons/${weatherIconID}.png">`;

//           // Formula for Celsius
//           let celsius = Math.floor((temperature - 32) * (5 / 9));

//           // Change temperature to Celsius/Fahrenheit
//           temperatureSection.addEventListener("click", () => {
//             if (temperatureSpan.textContent === "F") {
//               temperatureSpan.textContent = "C";
//               temperatureDegree.textContent = celsius;
//             } else {
//               temperatureSpan.textContent = "F";
//               temperatureDegree.textContent = temperature;
//             }
//           });
//         });
//     });
//   } else {
//     h1.textContent =
//       "Hey there!  If you want to get your location weather, we need to access your location.";
//   }
// });
