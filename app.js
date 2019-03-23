window.onload = () => {
    const $searchBtn = document.getElementById('searchBtn');
    const $searchInput= document.getElementById('cityName');
    const $temperatureUnit = document.getElementById('temperatureUnit');
    const $errorMessage = document.getElementById('errorMessage');
    const $weatherCard = document.getElementById('weather');
    const $weatherCardImg = document.getElementById('weatheCurrentDay__img');
    const $weatheCardCity = document.getElementById('weatheCurrentData__info-city');
    const $weatheCardTemperature = document.getElementById('weatheCurrentDay__info-temperature');
    const $weatheCardDate = document.getElementById('weatheCurrentData__info-date');
    const $weatherCardWindData = document.getElementById('weatherAdditionalInfo__wind-data');
    const $weatherCardWindImg = document.getElementById('weatherAdditionalInfo__wind-img');
    const $weatherCardPressureData = document.getElementById('weatherAdditionalInfo__pressure-data');
    const $weatherCardPressureingIng =  document.getElementById('weatherAdditionalInfo__pressure-img');

    $searchBtn.addEventListener('click', event => {
        event.preventDefault();
        const city = $searchInput.value;
        const units = $temperatureUnit.options[$temperatureUnit.selectedIndex].value;
        displayWeatherCard(city, units);
    })

    function displayWeatherCard(city, units) {
        fetchWeather(city, units)  
            .then(weather => updateWeatherCard(weather))
            .catch(error => showErrorMessage());
    }

    function updateWeatherCard(weatherInfo) {
        const iconCode = weatherInfo.weather[0].icon;
        $errorMessage.textContent = '';
        $weatheCardCity.textContent = `${weatherInfo.name} ${weatherInfo.sys.country}`;
        $weatherCardWindData.textContent = `${weatherInfo.wind.speed} m/h`;
        $weatherCardPressureData.textContent = `${weatherInfo.main.pressure} hpa`;
        $weatheCardTemperature.innerHTML = `${weatherInfo.main.temp}&deg;`;
        $weatheCardDate.textContent = Date.today().toString('MMM dd, dddd');
        $weatherCardImg.src = getIconPathByCode(iconCode);

        $weatherCard.style.display = 'block';
    }

    function showErrorMessage() {
        $errorMessage.textContent = 'Something went wrong';

        $weatherCard.style.display = 'block';
    }
}
