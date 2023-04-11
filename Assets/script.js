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

    //unique API to a variable//
    const APIKey = "9abea5dfd63f94e60ee99e562690a01d";

    function getWeather(cityName) {

        // current weather get request from open weather api//
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        // Axios is a popular JavaScript library used to make HTTP requests.//
        //It is a promise-based library that is easy to use and provides an elegant way to handle errors. //
        //Axios can be used in both the front-end and back-end of web applications.//
        axios.get(queryURL)

        .then(function (response) {

            todayweatherEl.classList.remove("d-none");
            
            // response to display current weather//
            const currentDate = new Date(response.data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", response.data.weather[0].description);


            //Get 5 day forecast for this city//
           let cityID = response.data.id;
           let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
           axios.get(forecastQueryURL)

        })
    }






}
initPage();