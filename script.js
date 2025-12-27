const API_KEY = "003265c4e9a44e8bd15f10eccc134e62";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const unitBtn = document.getElementById("unitBtn");
const themeBtn = document.getElementById("themeBtn");

const cityName = document.getElementById("cityName");
const dateTimeEl = document.getElementById("dateTime");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const descEl = document.getElementById("description");
const iconEl = document.getElementById("weatherIcon");
const forecastContainer = document.getElementById("forecastContainer");

let unit = "metric";
let cityTimezone = 0;
let sunriseUTC = 0;
let sunsetUTC = 0;
let clockInterval = null;

/* ================= FETCH ================= */

async function getWeather(city){
  const res = await fetch(`${BASE_URL}weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`);
  if(!res.ok) throw new Error("City not found");
  return res.json();
}

async function getForecast(city){
  const res = await fetch(`${BASE_URL}forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`);
  return res.json();
}

/* ================= CLOCK ================= */

function startLiveClock(){
  if(clockInterval) clearInterval(clockInterval);

  clockInterval = setInterval(()=>{
    // Convert local → UTC → city time
    const utcNowMs = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(utcNowMs + cityTimezone * 1000);

    const h = cityTime.getHours();
    const m = String(cityTime.getMinutes()).padStart(2,'0');
    const s = String(cityTime.getSeconds()).padStart(2,'0');

    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;

    const dateStr = cityTime.toLocaleDateString("en-US",{
      month:"short", day:"numeric", year:"numeric"
    });

    dateTimeEl.innerHTML = `
      ${dateStr} • ${hour12}:${m}:${s} ${ampm}
      <span class="ampm-icon">${ampm === "AM" ? "☀️" : "🌙"}</span>
    `;

    updateThemeBySun();
    updateGreetingByCity(h);
  },1000);
}

/* ================= THEME (CORRECT) ================= */

function updateThemeBySun(){
  const nowUTC = Math.floor(Date.now() / 1000);

  if(nowUTC >= sunriseUTC && nowUTC < sunsetUTC){
    document.body.classList.remove("night");
  } else {
    document.body.classList.add("night");
  }
}

/* ================= GREETING ================= */

// function updateGreetingByCity(hour){
//   let text = "Good Day";

//   if(hour < 12) text = "Good Morning ☀️";
//   else if(hour < 18) text = "Good Afternoon 🌤";
//   else text = "Good Evening 🌙";

//   document.getElementById("greeting").textContent = text;
// }

/* ================= RENDER ================= */

function renderWeather(data){
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°`;
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
  descEl.textContent = data.weather[0].description;
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  cityTimezone = data.timezone;
  sunriseUTC = data.sys.sunrise;
  sunsetUTC = data.sys.sunset;

  startLiveClock();   // ✅ only once
}

/* ================= FORECAST ================= */

function renderForecast(data){
  forecastContainer.innerHTML = "";

  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  daily.forEach(day=>{
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
      <p>${Math.round(day.main.temp)}°</p>
    `;
    forecastContainer.appendChild(card);
  });
}

/* ================= EVENTS ================= */

searchBtn.addEventListener("click", async ()=>{
  const city = cityInput.value.trim();
  if(!city) return alert("Enter a city name");

  try{
    const weather = await getWeather(city);
    const forecast = await getForecast(city);
    renderWeather(weather);
    renderForecast(forecast);
  }catch{
    alert("City not found");
  }
});

unitBtn.addEventListener("click", async ()=>{
  unit = unit === "metric" ? "imperial" : "metric";
  unitBtn.textContent = unit === "metric" ? "°C" : "°F";

  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const weather = await getWeather(city);
    const forecast = await getForecast(city);
    renderWeather(weather);
    renderForecast(forecast);
  } catch {
    alert("City not found");
  }
});

themeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("night");
});
/* ================= KEYBOARD SUPPORT ================= */

window.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }

  else if (e.key === "Escape") {
    cityInput.value = "";
    clearWeatherUI();
    cityInput.focus();
  }

  else if (e.key.toLowerCase() === "c") {
    unitBtn.click();
  }

  else if (e.key.toLowerCase() === "n") {
    themeBtn.click();
  }
});

cityInput.focus();
function clearWeatherUI(){
  cityName.textContent = "---";
  dateTimeEl.textContent = "---";
  temperatureEl.textContent = "--°";
  humidityEl.textContent = "Humidity: --%";
  descEl.textContent = "---";
  iconEl.src = "";
  forecastContainer.innerHTML = "";

  // stop clock
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }

  // // reset theme
  // document.body.classList.remove("night");
}
clearWeatherUI();
cityInput.focus();
