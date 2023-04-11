// The purpose of this function is to set up the initial conditions for the exp.htm page.//
function initPage() {

    const cityEl = document.getElementById("enter-city");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-picture");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const historyEl = document.getElementById("history");
    var fivedayEl = document.getElementById("days-header");
    var todayweatherEl = document.getElementById("today-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
}
initPage();