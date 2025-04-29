document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const errorMessage = document.getElementById('error-message');
    
    // Weatherbit.io API configuration
    const apiKey = 'd9f3877987804a1986670465b76697ca'; // Replace with your actual key
    const apiUrl = 'https://api.weatherbit.io/v2.0/current?';
    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            showError('Please enter a city name');
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            } else {
                showError('Please enter a city name');
            }
        }
    });
    
    async function fetchWeather(city) {
        try {
            const response = await fetch(`${apiUrl}city=${city}&key=${apiKey}&units=M`);
            
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            
            const data = await response.json();
            
            // Weatherbit.io returns an array with one object in 'data'
            const weatherData = data.data[0];
            
            // Update the UI with weather data
            cityName.textContent = `${weatherData.city_name}, ${weatherData.country_code}`;
            temperature.textContent = `${Math.round(weatherData.temp)}°C`;
            weatherDescription.textContent = weatherData.weather.description;
            humidity.textContent = `${weatherData.rh}%`;
            wind.textContent = `${weatherData.wind_spd.toFixed(1)} m/s`;
            
            // Hide error message if previously shown
            errorMessage.classList.add('hidden');
            
        } catch (error) {
            showError(error.message);
            clearWeatherData();
        }
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
    
    function clearWeatherData() {
        cityName.textContent = 'Search for a city';
        temperature.textContent = '--°C';
        weatherDescription.textContent = 'Weather information will appear here';
        humidity.textContent = '--%';
        wind.textContent = '-- m/s';
    }
});