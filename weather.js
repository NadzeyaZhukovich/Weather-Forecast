const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

function fetchWeather(city, units) {
    const url = `${BASE_URL}q=${city}&units=${units}&appid=${ApiKeys.openWeatherMapKey}`;
    
    return fetch(url)
        .then(handleErrors)
        .then(response => response.json())
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function getIconPathByCode(iconCode) {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
}