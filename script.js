let weatherDays = [];

async function getWeather(location){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=55079f1e76d548ea8f8200127232610 &q=${location}&days=3&aqi=no&alerts=no`)
    const weatherData = await response.json();
    for(let i = 0; i < 3; i++)
        weatherDays.push({
        'Date': weatherData.forecast.forecastday[i].date,
        'Condition': weatherData.forecast.forecastday[i].day.condition.text,
        'img src':  weatherData.forecast.forecastday[i].day.condition.icon,
        'Temp High (F)': weatherData.forecast.forecastday[i].day.maxtemp_f,
        'Average Temp (F)': weatherData.forecast.forecastday[i].day.avgtemp_f,
        'Temp Low (F)': weatherData.forecast.forecastday[i].day.mintemp_f,
        'Average Humidity:': weatherData.forecast.forecastday[i].day.avghumidity,
        'Chance of Rain %': weatherData.forecast.forecastday[i].day.daily_chance_of_rain,
        'Chance of Snow %': weatherData.forecast.forecastday[i].day.daily_chance_of_snow});
    return weatherDays;
}

 function buildWeatherCard(weatherArray){
    const content = document.getElementById('content')
    while(content.firstChild){
        content.removeChild(content.firstChild)
    }
    for(let day of weatherArray){
        const newDay = document.createElement('div')
        newDay.classList.add('day')
        for(let property in day){
            if(property === 'img src'){
                let imageHolder = document.createElement('img')
                let imgSourceString = `${day[property]}`
                imageHolder.src = `https://${imgSourceString}`
                console.log(imageHolder.src)
                newDay.appendChild(imageHolder)
            } else {
            let weatherAspect = document.createElement('p')
            weatherAspect.textContent = `${property}: ${day[property]}`
            newDay.appendChild(weatherAspect)
            }
        }
        content.appendChild(newDay)
    }
}

const confirmBtn = document.querySelector('#confirm')
confirmBtn.addEventListener('click', async ()=>{
        let location = document.querySelector('#location').value;
        if(weatherDays.length > 0){
            weatherDays.splice(0,3);
        }
        const weather = await getWeather(location);
        buildWeatherCard(weather)
    }
)