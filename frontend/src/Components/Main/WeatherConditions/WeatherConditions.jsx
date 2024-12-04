import React, { useState, useEffect } from 'react';
import './WeatherConditions.css';

export const WeatherConditions = () => {
    const [weather, setWeather] = useState({
        temperature: null,
        humidity: null,
        precipitation: null,
        windSpeed: null,
    });

    // Імітація завантаження погодних даних
    useEffect(() => {
        const fetchWeather = () => {
            const mockWeather = {
                temperature: 12, // °C
                humidity: 78, // %
                precipitation: 'Легкий дощ', // текст
                windSpeed: 5, // м/с
            };
            setWeather(mockWeather);
        };

        fetchWeather();
    }, []);

    return (
        <div className="weather-container">
            <h1 className="weather-title">Актуальні погодні умови на Львівщині</h1>
            <div className="weather-info">
                <div className="weather-item">
                    <span className="weather-label">Температура:</span>
                    <span className="weather-value">{weather.temperature}°C</span>
                </div>
                <div className="weather-item">
                    <span className="weather-label">Вологість:</span>
                    <span className="weather-value">{weather.humidity}%</span>
                </div>
                <div className="weather-item">
                    <span className="weather-label">Опади:</span>
                    <span className="weather-value">{weather.precipitation}</span>
                </div>
                <div className="weather-item">
                    <span className="weather-label">Швидкість вітру:</span>
                    <span className="weather-value">{weather.windSpeed} м/с</span>
                </div>
            </div>
        </div>
    );
};