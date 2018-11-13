window.onload = () => {
    const $searchBtn = document.getElementById('searchBtn');
    const $searchInput= document.getElementById('cityName');
    const $temperatureUnit = document.getElementById('temperatureUnit');
    const $weatheCardCity = document.getElementById('weatheCurrentDay__info-city');
    const $weatheCardTemperature = document.getElementById('weatheCurrentDay__info-temperature');


    $searchBtn.addEventListener('click', event => {
        event.preventDefault();
        let city = $searchInput.value;
        fetchWeather(city);   
    })

    function fetchWeather(city) {
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + ApiKeys.openWeatherMapKey;
        
        fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(weather => updateWetherCard(weather))
            .catch(error => console.log('error'));
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    function updateWetherCard(weatherInfo) {
        $weatheCardCity.textContent = weatherInfo.name;
        $weatheCardTemperature.innerHTML = `${weatherInfo.main.temp}&deg;`;
    }
}


