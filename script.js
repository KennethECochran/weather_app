async function getWeather(location){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=55079f1e76d548ea8f8200127232610 &q=${location}&days=3&aqi=no&alerts=no`)
    const weatherData = await response.json();
   //console.log(weatherData.forecast.forecastday[0].day.maxtemp_f);
    return weatherData;
}

 function buildWeatherCard(weatherObject){
    const content = document.getElementById('content')
    const weather_maxtemp = document.createElement('div')
    weather_maxtemp.classList.add('weatherDay')
    weather_maxtemp.textContent = `High for Today in F: ${weatherObject.forecast.forecastday[0].day.maxtemp_f}`
    content.appendChild(weather_maxtemp)
}

const confirmBtn = document.querySelector('#confirm')
confirmBtn.addEventListener('click', async ()=>{
        let location = document.querySelector('#location').value;
        const weather = await getWeather(location);
        buildWeatherCard(weather)
    }
)