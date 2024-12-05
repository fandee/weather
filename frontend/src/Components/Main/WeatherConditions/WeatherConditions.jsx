import React, { useState, useEffect } from 'react';
import './WeatherConditions.css';
import axios from "axios";

export const WeatherConditions = () => {
  // Стан для зберігання погодних даних
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    precip: null,
    wind: null,
    humidity: null,
  });

  // Стан для обробки помилок
  const [error, setError] = useState(null);

  // Функція для отримання даних з бекенду
  const fetchWeather = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/current_weather/");
      const data = response.data;

      // Оновлюємо стан з отриманими даними
      setWeatherData({
        temperature: data.temperature !== undefined ? data.temperature : "N/A",
        precip: data.precip !== undefined ? data.precip : "N/A",
        wind: data.wind !== undefined ? data.wind : "N/A",
        humidity: data.humidity !== undefined ? data.humidity : "N/A",
      });

      setError(null); // Очищаємо помилку, якщо запит успішний
    } catch (err) {
      console.error("Помилка при отриманні погодних даних:", err);
      setError("Не вдалося завантажити дані про погоду");
    }
  };

  // Використовуємо useEffect для запиту під час завантаження компонента
  useEffect(() => {
    fetchWeather();
  }, []); // [] означає, що запит виконується лише один раз під час першого рендерингу

  return (
    <div className='weather-container'>
      <h1 className='weather-title'>Актуальні погодні умови</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="weather-info">
            <div className="weather-item">
                <span className="weather-label">Температура:</span>
                <span className="weather-value">{weatherData.temperature}°C</span>
            </div>
            <div className="weather-item">
                <span className="weather-label">Вологість:</span>
                <span className="weather-value">{weatherData.humidity}%</span>
            </div>
            <div className="weather-item">
                <span className="weather-label">Опади:</span>
                <span className="weather-value">{weatherData.precip} мм</span>
            </div>
            <div className="weather-item">
                <span className="weather-label">Швидкість вітру:</span>
                <span className="weather-value">{weatherData.wind} м/с</span>
            </div>
        </div>
      )}
    </div>
    
  );
};