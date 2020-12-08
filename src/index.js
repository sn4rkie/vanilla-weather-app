function displayWeather(response) {
	console.log(response);

	document.querySelector(`.city`).innerHTML = (`${response.data.name}, ${response.data.sys.country}`);
	document.querySelector(`.temperature`).innerHTML = `${Math.round(response.data.main.temp)}°C`;
	document.querySelector(`.met-description`).innerHTML = (`${response.data.weather[0].description}`);
	document.querySelector(`.hiloResult`).innerHTML = `${Math.round(response.data.main.temp_max)}°C | ${Math.round(response.data.main.temp_min)}°C`;
	document.querySelector(`.windResult`).innerHTML = (`${response.data.wind.speed} km/hr`);
	document.querySelector(`.humidityResult`).innerHTML = (`${response.data.main.humidity}%`);

	let iconElement = document.querySelector(`#iconNow`);
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
	iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

	celsiusTemperature = Math.round(response.data.main.temp);

	let date = new Date();
	let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	let weekday = weekdays[date.getDay()];
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = months[date.getMonth()];
		
	document.querySelector(`.date`).innerHTML = (`${weekday}, ${month} ${date.getDate()}, ${date.getFullYear()}`);
	document.querySelector(".clock").innerHTML = formatHours(response.data.dt * 1000); 
}

function formatHours(timestamp) {
	let date = new Date(timestamp);

	let h = date.getHours();
	let m = date.getMinutes();
	if (h < 10) {h = `0${h}`;}
	if (m < 10) {m = `0${m}`;}

	return h + ":" + m;
}

function displayForecast(response) {
	console.log(response);
	let forecast = response.data;

	let forecastElement1 = document.querySelector(".forecast1");
	forecastElement1.innerHTML = `${formatHours(forecast.list[0].dt * 1000)}
	<img src="http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png">
	${forecast.list[0].weather[0].main.temp_min} | ${forecast.list[0].weather[0].main.temp_min}`;

	let forecastElement2 = document.querySelector(".forecast2");
	forecastElement2.innerHTML = `${formatHours(forecast.list[1].dt * 1000)}
	<img src="http://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png">
	${forecast.list[1].weather[0].main.temp_min} | ${forecast.list[1].weather[0].main.temp_min}`;

	let forecastElement3 = document.querySelector(".forecast3");
	forecastElement3.innerHTML = `${formatHours(forecast.list[2].dt * 1000)}
	<img src="http://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png">
	${forecast.list[2].weather[0].main.temp_min} | ${forecast.list[2].weather[0].main.temp_min}`;
	
	let forecastElement4 = document.querySelector(".forecast4");
	forecastElement4.innerHTML = `${formatHours(forecast.list[3].dt * 1000)}
	<img src="http://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}@2x.png">
	${forecast.list[3].weather[0].main.temp_min} | ${forecast.list[3].weather[0].main.temp_min}`;
	
	let forecastElement5 = document.querySelector(".forecast5");
	forecastElement5.innerHTML = `${formatHours(forecast.list[4].dt * 1000)}
	<img src="http://openweathermap.org/img/wn/${forecast.list[4].weather[0].icon}@2x.png">
	${forecast.list[4].weather[0].main.temp_min} | ${forecast.list[4].weather[0].main.temp_min}`;
	
	let forecastElement6 = document.querySelector(".forecast6");
	forecastElement6.innerHTML = `${formatHours(forecast.list[5].dt * 1000)}
	<img src="http://openweathermap.org/img/wn/${forecast.list[5].weather[0].icon}@2x.png">
	${forecast.list[5].weather[0].main.temp_min} | ${forecast.list[5].weather[0].main.temp_min}`;
}


	/*
	icon3.innerHTML("#icon3-hi", `${forecast.weather[0].main.temp_max}`);
	icon3.innerHTML("#icon3-lo", `${forecast.weather[0].main.temp_min}`);*/

function convertToFahrenheit(event) {
	event.preventDefault();
	let fahrenheit = Math.round(celsiusTemperature * (9 / 5) + 32);	
	document.querySelector(`.temperature`).innerHTML = `${fahrenheit}°F`;
}

function convertToCelsius(event) {
	event.preventDefault();
	document.querySelector(`.temperature`).innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

function handleSearch(event) {
	event.preventDefault();
	let city= document.querySelector(`#cityInput`);
	search(city.value);
}

function showPosition(position) {
	let apiKey = "4b71899235f734ae8df5f2e02f0aba1a";
	let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
	let localApiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
	axios.get(localApiUrl).then(displayWeather);	
}

function getPosition() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

function search(city) {
	let apiKey = "4b71899235f734ae8df5f2e02f0aba1a";
	let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
	let searchApiUrl = `${apiEndpoint}q=${city}&units=metric&appid=${apiKey}`;
	axios.get(searchApiUrl).then(displayWeather);

	let forecastEndpoint = "https://api.openweathermap.org/data/2.5/forecast?";
	let forecastUrl = `${forecastEndpoint}q=${city}&units=metric&appid=${apiKey}`;
	axios.get(forecastUrl).then(displayForecast);
}

let celsiusButton = document.querySelector(`.celsius`);
celsiusButton.addEventListener("click", convertToCelsius);

let fahrenheitButton = document.querySelector(`.fahrenheit`);
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSearch);

let currentPositionButton = document.querySelector(`.positionButton`);
currentPositionButton.addEventListener("click", getPosition);

search(`Paradise City`);