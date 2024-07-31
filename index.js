const weatherForm = document.querySelector(".weatherForm");
const nameInput = document.querySelector(".nameInput");
const infoArea = document.querySelector(".infoArea");
const apiKey = "641c0412d7708d2fa28734db1428ff9c";

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = nameInput.value;

    if (city){
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error("An error occurred while fetching the weather data");
            showError("Please enter a valid city name");
        }
    }
    else{
        showError("Please enter a city name");
        
    }
}) ;

async function getWeather(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('An error occurred while fetching the weather data');
    }

    return await response.json();
}

function displayWeather(data) {
    const { name: city, 
            main: {temp, humidity}, 
            weather:[{description, id}]} = data;

    infoArea.textContent = '';
    infoArea.style.display = 'flex';


    // Creating elements
    const cityShown = document.createElement('h1');
    const tempShown = document.createElement('p');
    const humidityShown = document.createElement('p');
    const weatherShown = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    // Setting text content of the elements
    cityShown.textContent = city;
    tempShown.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityShown.textContent = `Humidity: ${humidity}%`;
    weatherShown.textContent = `${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Adding classes to the elements
    cityShown.classList.add('cityShown');
    tempShown.classList.add('tempShown');
    humidityShown.classList.add('humidityShown');
    weatherShown.classList.add('weatherShown');
    weatherEmoji.classList.add('weatherEmoji');

    // Appending elements to the infoArea
    infoArea.appendChild(cityShown);
    infoArea.appendChild(tempShown);
    infoArea.appendChild(humidityShown);
    infoArea.appendChild(weatherShown);
    infoArea.appendChild(weatherEmoji);

}

function getWeatherEmoji(weather) {
    if (weather >= 200 && weather < 300) {
        return '⛈️';
    } else if (weather >= 300 && weather < 400) {
        return '🌧️';
    } else if (weather >= 500 && weather < 600) {
        return '🌧️';
    } else if (weather >= 600 && weather < 700) {
        return '❄️';
    } else if (weather >= 700 && weather < 800) {
        return '🌫️';
    } else if (weather === 800) {
        return '☀️';
    } else if (weather > 800 && weather < 900) {
        return '☁️';
    } else {
        return '❓';
    }
}

function showError(message) {
    const errorShown = document.createElement("p");
    errorShown.textContent = message;
    errorShown.classList.add("errorShown");

    infoArea.textContent = "";
    infoArea.style.display = "flex";
    infoArea.appendChild(errorShown);
}
