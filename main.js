const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const citySearch = document.querySelector(".search-box input");
const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

citySearch.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    onSearchClick();
  }
});

search.addEventListener("click", function (event) {
  event.preventDefault();
  onSearchClick();
});

function onSearchClick() {
  const APIKey = "b69518df315893966ae4993b1491dca6";
  const city = citySearch.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "";
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((error) => console.log("Помилка запиту:", error));
}

function updateDateTime() {
  const currentDate = new Date();

  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = currentDate.toLocaleTimeString("en-US", optionsTime);

  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}

updateDateTime();

setInterval(updateDateTime, 10000);
