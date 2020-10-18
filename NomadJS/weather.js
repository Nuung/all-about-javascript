// Get Dom Object
const weatherStatus = document.querySelector(".js-weather-status");
const weather = document.querySelector(".js-weather-span");

// static val
const COORDS = 'coords';
const api_key = '0c4f6928421cb4da0e041bfe0aaa57c8';

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    )
    .then(function(response) {
        // console.log(response.json());
        return response.json()
    })
    .then(function(json) {
        // console.log(json.weather[0].main);
        const status = json.weather[0].main;
        const temp = json.main.temp;
        const place = json.name;
        weatherStatus.innerText = `It's ${status}!\n`
        weather.innerText = `Temperature: ${temp} @ City: ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // const coordsObj = {
    //     latitude: latitude,
    //     longitude: longitude
    // };
    // 위와 결과는 동일하게 된다! short coding 가능 
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant Access Geo");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();

}

init();