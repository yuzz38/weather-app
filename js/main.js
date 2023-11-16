const form = document.querySelector('#form');
const textInput = document.querySelector('.form__input')
form.onsubmit = submitHandler;
const APY__KEY = 'd99f5c3737305201b611e18fbeb8a27f'

async function submitHandler(e) {
    e.preventDefault();
    
    if (textInput.value.trim() === '') {
        alert('Пожалуйста введите город')
    }   
    const cityInfo = await getGeo(textInput.value.trim());
    console.log(cityInfo)
    
    const WeatherInfo = await Weather(cityInfo[0]['lat'],cityInfo[0]['lon']);
    const WeatherData = { 
        name: WeatherInfo.name,
        temp: WeatherInfo.main.temp,
        humidity: WeatherInfo.main.humidity,
        speed: WeatherInfo.wind.speed,
        main: WeatherInfo.weather[0].main
        
    }
    renderWeatherData(WeatherData);
}
async function getGeo (name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${APY__KEY}`;
    const response = await fetch(geoUrl);
    const dataResponse = await response.json();
    return dataResponse;
}
async function Weather (lat,lon) {
    const WeatherID = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&lat=${lat}&lon=${lon}&appid=${APY__KEY}`;
    const response = await fetch(WeatherID);
    const dataResponse = await response.json();
    
    return dataResponse;
}
function renderWeatherData(data) {
    const temp = document.querySelector('.weather__temp');
    const city = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const img = document.querySelector('.weather__img');
    temp.innerText = Math.round(data.temp) + '°c',
    city.innerText = data.name,
    humidity.innerText = data.humidity + '%',
    speed.innerText = data.speed + 'км/ч';
    const fileName = {
        'Clouds': 'clouds',
        'Clear': 'clear',
        'Rain': 'rain',
    }
    if (fileName[data.main]) {
        img.src = `./img/weather/${fileName[data.main]}.png`
    }
}