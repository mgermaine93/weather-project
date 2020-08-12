window.addEventListener("load", () => {
  let latitude;
  let longitude;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationCity = document.querySelector(".location-city");
  let locationIcon = document.querySelector(".location-icon");

  // This will only work is the user opts in to geolocation through the browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // const edgewoodAPI = https://api.openweathermap.org/data/2.5/weather?lat=40.4346&lon=-79.8655&appid=b93a26639b8af233ddd0bd2ecea99037

      // const proxy = "https://cors-anywhere.herokuapp.com/";
      //const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b93a26639b8af233ddd0bd2ecea99037`;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=40.4346&lon=-79.8655&units=imperial&appid=b93a26639b8af233ddd0bd2ecea99037`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          // Set DOM elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationCity.textContent = data.name;
          // Need to figure out icon stuff...
          $(".location-icon").html("<img src=' + icon + '>");
          // locationIcon.textContent = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
  } else {
    h1.textContent =
      "Hey there!  If you want to get your location weather, we need to access your location.";
  }
});
