window.onload = () => {
    const $searchBtn = document.getElementById('searchBtn');
    const $searchInput= document.getElementById('cityName');
    const $temperatureUnit = document.getElementById('temperatureUnit');
    const $errorMessage = document.getElementById('errorMessage');
    const $weatherCard = document.getElementById('weather');
    const $weatherCardImg = document.getElementById('weatheCurrentDay__img');
    const $weatheCardCity = document.getElementById('weatheCurrentDay__info-city');
    const $weatheCardTemperature = document.getElementById('weatheCurrentDay__info-temperature');
    const $weatheCardDate = document.getElementById('weatheCurrentDay__info-date');

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
            .catch(error => showErrorMessage());
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    function updateWetherCard(weatherInfo) {
        const iconCode = weatherInfo.weather[0].icon;
        $errorMessage.textContent = '';
        $weatheCardCity.textContent = weatherInfo.name;
        $weatheCardTemperature.innerHTML = `${weatherInfo.main.temp}&deg;`;
        $weatheCardDate.textContent = Date.today().toString('MMM dd, dddd');
        $weatherCardImg.src = 'http://openweathermap.org/img/w/' + iconCode +'.png';

        $weatherCard.style.display = 'block';
    }
    function showErrorMessage() {
        $errorMessage.textContent = "Something went wrong";

        $weatherCard.style.display = 'block';
    }
}


