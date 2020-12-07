function displayForecast(response) {
	console.log(response);

	document.querySelector(`.city`).innerHTML = (`${response.data.name}, ${response.data.sys.country}`);
	document.querySelector(`.temperature`).innerHTML = `${Math.round(response.data.main.temp)}°C`;
	document.querySelector(`.met-description`).innerHTML = (`${response.data.weather[0].description}`);
	document.querySelector(`.hiloResult`).innerHTML = `${Math.round(response.data.main.temp_max)}°C | ${Math.round(response.data.main.temp_min)}°C`;
	document.querySelector(`.windResult`).innerHTML = (`${response.data.wind.speed} km/hr`);
	document.querySelector(`.humidityResult`).innerHTML = (`${response.data.main.humidity}%`);

	let iconElement = document.querySelector(`#iconDay1`);
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
	iconElement.setAttribute("alt", `${response.data.weather[0].description}`)

	function convertToFahrenheit() {
		let fahrenheit = Math.round(response.data.main.temp * (9 / 5) + 32);	
		document.querySelector(`.temperature`).innerHTML = `${fahrenheit}°F`;
	}
	let fahrenheitButton = document.querySelector(`.fahrenheit`);
	fahrenheitButton.addEventListener("click", convertToFahrenheit);

	function convertToCelsius() {
		let celsius = Math.round(response.data.main.temp);
		document.querySelector(`.temperature`).innerHTML = `${celsius}°C`;
	}
	let celsiusButton = document.querySelector(`.celsius`);
	celsiusButton.addEventListener("click", convertToCelsius);
}

function showPosition(position) {
	let apiKey = "4b71899235f734ae8df5f2e02f0aba1a";
	let apiEndpoint = `https://api.openweathermap.org/data/2.5/forecast?`;
	let localApiUrl = `${apiEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
	axios.get(localApiUrl).then(displayForecast);
}

function getPosition() {
	navigator.geolocation.getCurrentPosition(showPosition);
}
let currentPositionButton = document.querySelector(`.positionButton`);
currentPositionButton.addEventListener("click", getPosition);

function formatToday() {
	let date = new Date();
	let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	let weekday = weekdays[date.getDay()];
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = months[date.getMonth()];
	let h = date.getHours();
	let m = date.getMinutes();
	if (h < 10) {h = `0${h}`;}
	if (m < 10) {m = `0${m}`;}

	document.querySelector(`.date`).innerHTML = (`${weekday}, ${month} ${date.getDate()}, ${date.getFullYear()}`);
    document.querySelector(".clock").innerHTML = h + ":" + m;
    
    setTimeout(formatToday, 1000);  
}
formatToday();

function handleSearch(event) {
	event.preventDefault();
	let city= document.querySelector(`#cityInput`);
	search(city.value);
}
let searchButton = document.querySelector(`.searchButton`);
searchButton.addEventListener("click", handleSearch);

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSearch)

function search(city) {
	let apiKey = "4b71899235f734ae8df5f2e02f0aba1a";
	let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
	let searchApiUrl = `${apiEndpoint}q=${city}&units=metric&appid=${apiKey}`;
	axios.get(searchApiUrl).then(displayForecast);
}
search(`Paradise City`);






/* 	function convertDegrees () {
		if (fahrenheitButton.click === true) {
			let fahrenheit = Math.round(response.data.main.temp * (9 / 5) + 32);	
			return document.querySelector(`.temperature`).innerHTML = `${fahrenheit} °F`;
		} else if (celsiusButton.click === true) {
			let celsius = Math.round(response.data.main.temp) 
			return document.querySelector(`.temperature`).innerHTML = `${celsius} °C`;
		}
	}
	let celsiusButton = document.querySelector(`.celsius`);
	let fahrenheitButton = document.querySelector(`.fahrenheit`);
	celsiusButton.addEventListener("click", convertDegrees);
	fahrenheitButton.addEventListener("click", convertDegrees);
	*/