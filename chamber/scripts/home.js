const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


/* COPYRIGHT */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


/* WEATHER */

const apiKey = "6b46d9af6b66fd33ec6fad481909adb8";
const lat = 19.0641; // Latitude for Cholula, Puebla
const lon = -98.3035; // Longitude for Cholula, Puebla

async function fetchWeatherData() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error(error);
    document.querySelector("#current-weather").innerHTML = "<p>Weather unavailable.</p>";
    document.querySelector("#forecast").innerHTML = "<p>Forecast unavailable.</p>";
  }
}

function displayCurrentWeather(data) {
  const container = document.querySelector("#current-weather");
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  container.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p class="temperature"><strong>${temp}°C</strong></p>
    <p class="description">${description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

function displayForecast(data) {
  const container = document.querySelector("#forecast");
  container.innerHTML = "";

  const dailyData = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  const forecastDays = Object.keys(dailyData).slice(1, 4);

  forecastDays.forEach((dayKey) => {
    const dayReadings = dailyData[dayKey];
    const temps = dayReadings.map((r) => r.main.temp);
    const minTemp = Math.round(Math.min(...temps));
    const maxTemp = Math.round(Math.max(...temps));

    const dateObj = new Date(`${dayKey}T12:00:00`);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    const card = document.createElement("article");
    card.classList.add("forecast-day");
    card.innerHTML = `
      <h4>${dayName}</h4>
      <p>${minTemp}°C / ${maxTemp}°C</p>
    `;

    container.appendChild(card);
  });
}

fetchWeatherData();

  const dailyData = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  const forecastDays = Object.keys(dailyData).slice(1, 4);

  forecastDays.forEach((dayKey) => {
    const dayReadings = dailyData[dayKey];
    const temps = dayReadings.map((r) => r.main.temp);
    const minTemp = Math.round(Math.min(...temps));
    const maxTemp = Math.round(Math.max(...temps));

    const dateObj = new Date(`${dayKey}T12:00:00`);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    const card = document.createElement("article");
    card.classList.add("forecast-day");
    card.innerHTML = `
      <h4>${dayName}</h4>
      <p>${minTemp}°C / ${maxTemp}°C</p>
    `;

    container.appendChild(card);
  });


fetchWeatherData();



async function getSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members.");
        }

        const members = await response.json();

        const qualifiedMembers =
            members.filter(
                (member) =>
                    member.membership === 2 ||
                    member.membership === 3
            );

        const shuffledMembers =
            qualifiedMembers.sort(
                () => Math.random() - 0.5
            );

        const selectedMembers =
            shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {

        console.error(error);

        document.querySelector("#spotlight-container").innerHTML =
            "<p>Business information is currently unavailable.</p>";
    }
}


function displaySpotlights(members) {

    const container =
        document.querySelector("#spotlight-container");

    container.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        const membershipName =
            member.membership === 3
                ? "Gold"
                : "Silver";

        card.innerHTML = `
            <h3>${member.name}</h3>

            <img src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy">

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <strong>${membershipName} Member</strong>
            </p>

            <a href="${member.website}"
                target="_blank"
                rel="noopener noreferrer">
                Visit Website
            </a>
        `;

        container.appendChild(card);
    });
}


getWeather();
getSpotlights();