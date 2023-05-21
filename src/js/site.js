import {
  API_KEY,
  BASE_URL,
  REFRESH_DATA_INTERVAL,
  REFRESH_UI_INTERVAL,
} from "./env.js";

// This constant holds our application state.
const WL = {
  fetchDataInterval: null,
  refreshUIInterval: null,
  currentData: null,
  currentPosition: "topLeft",
  endpoint: `${BASE_URL}?q=London&appid=${API_KEY}`,
  container: null,
};

const main = () => {
  // Call right now, then set interval.
  WL.container = document.getElementById("weather-layer-container");
  fetchAPIData(WL.endpoint);
  WL.fetchDataInterval = setInterval(() => {
    fetchAPIData(WL.endpoint);
  }, REFRESH_DATA_INTERVAL);
  refreshUI();
  WL.refreshUIInterval = setInterval(refreshUI, REFRESH_UI_INTERVAL);
};

/**
 * A function that fetches data from a given URL.
 * @param {string} url
 */
async function fetchAPIData(url) {
  console.debug(`Fetching data from ${url}`);
  try {
    const response = await fetch(url);
    const json = await response.json();
    WL.currentData = json;
    console.debug(json);
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
// Call the main function.
main();
