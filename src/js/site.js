import * as env from "./env.js";

// This constant holds our application state.
const WL = {
  fetchDataInterval: null,
  refreshUIInterval: null,
  currentData: null,
  currentPosition: "topLeft",
  endpoint: `${env.BASE_URL}?q=${env.LOCATION}&appid=${env.API_KEY}`,
  container: null,
};

const main = () => {
  // Call right now, then set interval.
  WL.container = document.getElementById("weather-layer-container");
  fetchAPIData(WL.endpoint);
  WL.fetchDataInterval = setInterval(() => {
    fetchAPIData(WL.endpoint);
  }, env.REFRESH_DATA_INTERVAL);
  WL.refreshUIInterval = setInterval(refreshUI, env.REFRESH_UI_INTERVAL);
};

/**
 * A function that fetches data from a given URL.
 * @param {string} url
 */
async function fetchAPIData(url) {
  console.debug(`Fetching data from ${url}`);
  try {
    const response = await fetch(url);
    WL.currentData = await response.json();
    refreshWidget(WL.currentData);
  } catch (e) {
    console.warn("Fetch or parse error", e);
  }
}

/**
 * A function that refreshes the user interface.
 */
function refreshUI() {
  console.debug("Refreshing the user interface");
  const currentClass = WL.container.classList[0];
  const position = +currentClass.match(/\d+/)[0];
  WL.container.classList.remove(currentClass);
  WL.container.classList.add(`pos-${(position + 1) % 4}`);
}

/**
 * This function uses the data it receives to refresh the look of the
 * weather widget.
 * @param {json} data
 */
function refreshWidget(data) {
  document.getElementById("location").innerText = data.name;
  document
    .getElementById("weather-icon")
    .setAttribute(
      "src",
      env.ICONS_URL.replace("{{icon}}", data.weather[0].icon)
    );
  document.getElementById("temperature").innerText =
    Math.round(data.main.temp) / 10 + "°";
  document.getElementById("description").innerText =
    data.weather[0].description;
  // Best effort to set a nice color.
  WL.container.style.backgroundColor = getMainBackgroundColor(
    data.weather[0].main
  );
  // This function calls a refresh of the API.
  refreshUI();
}

/**
 * Try to use the name of the weather as returned by the API to come up
 * with a nice color background for the widget.
 * @param {string} weather
 * @returns
 */
function getMainBackgroundColor(weather) {
  switch (weather.toLowerCase()) {
    case "clouds":
      return "rgba(211, 211, 211, 0.7)";
    case "rain":
      return "rgba(173, 216, 230, 0.7)";
    case "clear":
      return "rgba(255, 255, 224, 0.7)";
    case "sunny":
      return "rgba(255, 255, 0, 0.7)";
    case "snowing":
      return "rgba(255, 255, 255, 0.7)";
    case "stormy":
      return "rgba(139, 0, 0, 0.7)";
    case "extreme":
      return "rgba(255, 69, 0, 0.7)";
    default:
      return "rgba(255, 255, 255, 0.7)";
  }
}

// Call the main function.
main();
