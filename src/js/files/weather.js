
ymaps.ready(() => {
    ymaps.geolocation.get({ provider: 'yandex', autoReverseGeocode: true })
        .then((result) => {
            const userLocation = result.geoObjects;
            console.log(userLocation.position);
            getWeatherData(userLocation.position);
        });
});

const getWeatherData = async location => {
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=b2e800893688bfb52a003bd731d279cb&units=metric`)
    const data = await response.json();
    console.log(data)
    setUserCity(data.name)

    const currentWeatherValue = Math.round(data.main.temp)

    const weatherValue = document.querySelector('.weather__value')
    weatherValue.classList.remove('load-holder')
    weatherValue.textContent = currentWeatherValue + '°C'
};

const setUserCity = city => {
    const cityValue = document.querySelector('.weather__about-city')
    cityValue.classList.remove('load-holder')
    cityValue.textContent = city
}