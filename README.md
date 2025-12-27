# 🌤 Weather App

A simple and responsive **Weather Application** built using **HTML, CSS, and JavaScript**.
The app allows users to search for any city and view its **current weather conditions and 5-day forecast** using the OpenWeather API.

---

## 📁 Project Files

```
weather-app/
 ├── index.html   # Page structure and layout
 ├── style.css    # Styling, themes, and responsiveness
 └── script.js    # API requests, logic, and interactions
```

---

## ✨ Features

* Search weather by city name
* Display:
  * Temperature (°C / °F)
  * Weather description
  * Humidity
  * Weather icon
* 5-Day weather forecast
* Live date and time based on the selected city
* Day and night theme (manual and automatic)
* Keyboard shortcuts for better usability
* Responsive design (desktop and mobile)

---

## 🌐 API Used

**OpenWeather API**

* **Base URL:**

  ```
  https://api.openweathermap.org/data/2.5/
  ```

* **Endpoints Used:**

  * `/weather`
  * `/forecast`

* **Authentication:**
  ✔ API Key required

---

## ▶️ How to Run the Project

### Method 1: Open in Browser

1. Open the project folder
2. Double-click `index.html`
3. The app will run in your browser

---

### Method 2: Using a Local Server (Optional)

Using Python:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000/index.html
```

---

## 🧠 How to Use

1. Enter a city name in the search box
2. Click **Search** or press **Enter**
3. View current weather details
4. Scroll to see the 5-day forecast
5. Toggle:

   * **°C / °F** for temperature unit
   * **🌙** for night mode

---

## ⌨️ Keyboard Shortcuts

| Key   | Action             |
| ----- | ------------------ |
| Enter | Search weather     |
| Esc   | Clear weather data |
| C     | Toggle °C / °F     |
| N     | Toggle night mode  |

---

## 📱 Responsive Design

The application works properly on:

* Desktop ✔
* Tablet ✔
* Mobile ✔

---

## ⚙️ Technical Notes

* Uses `fetch()` with `async/await`
* DOM is updated dynamically
* Input is validated before API calls
* No external libraries or frameworks used
* Clear UI reset to avoid showing old data

---

## 🌍 Browser Compatibility

* Chrome / Edge ✅
* Firefox ✅
* Safari ✅

---

## 📜 License

Open source — free to use and modify for educational purposes.


