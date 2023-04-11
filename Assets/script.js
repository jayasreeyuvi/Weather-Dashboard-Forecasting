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


            // K2f method it also use to convert a temp °F to °C //
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176C";
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";



            //Get 5 day forecast for this city//
           let cityID = response.data.id;
           let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
           axios.get(forecastQueryURL)

            .then(function (response) {

                fivedayEl.classList.remove("d-none");

                // display forecast for next 5 days// 
                const forecastEls = document.querySelectorAll(".forecast");

                for (i = 0; i < forecastEls.length; i++) {

                    forecastEls[i].innerHTML = "";
                    const forecastIndex = i * 8 + 4;
                    const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth() + 1;
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);

                    // Icon for current weather//
                    const forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    const forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176C";
                    forecastEls[i].append(forecastTempEl);
                    const forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);

                }

            })

        });
    }

    //  Get history from local storage //
    searchEl.addEventListener("click", function () {
        const searchTerm = cityEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        SearchHistory();
    })

    // Clear History button //
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        SearchHistory();
    })

    //You may have noticed above that our data.main.temp was wrapped in a K2F function. That’s because I had already written the function before writing this. I’m no scientist or mathematician so for this I had to google the conversion formula. Once you have that formula you can simply drop it into a function with the call ‘return.’ One thing to remember is the default setting will give you numbers will give you decimal points for days so you may want to put the equation in a Math.floor.//
    //Since we’re already in math mode we’ll go ahead and build functions to convert Celsius to Fahrenheit and vice versa. Again, a quick google search will give you the formula you need and then you can drop it into a function.//
    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    // search history //
    function SearchHistory() {

        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block btn btn-outline-info rounded-pill");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    SearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }


}
initPage();