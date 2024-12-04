import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import customIcon from '../../assets/point.png'; // Замість цього вкажіть шлях до завантаженого файлу

const CustomIcon = new L.Icon({
  iconUrl: customIcon,
  iconSize: [40, 40], // Розміри іконки (за необхідності змініть)
  iconAnchor: [20, 40], // Точка, яка буде співпадати з координатами
  popupAnchor: [0, -40], // Точка прив’язки для попапа
});


const WeatherMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Імітація отримання даних про погоду
  const fetchWeatherData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockWeatherData = [
        { id: 1, name: 'Львів', lat: 49.8397, lon: 24.0297, temperature: 10, rainfall: 5, humidity: 80, windSpeed: 3 },
        { id: 2, name: 'Дрогобич', lat: 49.3548, lon: 23.5055, temperature: 12, rainfall: 3, humidity: 75, windSpeed: 4 },
        { id: 3, name: 'Червоноград', lat: 50.3843, lon: 24.2301, temperature: 8, rainfall: 7, humidity: 85, windSpeed: 2 },
        { id: 4, name: 'Стрий', lat: 49.2562, lon: 23.8505, temperature: 10, rainfall: 4, humidity: 82, windSpeed: 3 },
        { id: 5, name: 'Самбір', lat: 49.5187, lon: 23.2013, temperature: 6, rainfall: 8, humidity: 87, windSpeed: 2 },
        { id: 6, name: 'Броди', lat: 50.0811, lon: 25.1485, temperature: 9, rainfall: 5, humidity: 81, windSpeed: 3 },
        { id: 7, name: 'Трускавець', lat: 49.2794, lon: 23.5069, temperature: 8, rainfall: 6, humidity: 79, windSpeed: 4 },
        { id: 8, name: 'Сокаль', lat: 50.4748, lon: 24.2743, temperature: 7, rainfall: 7, humidity: 86, windSpeed: 2 },
        { id: 9, name: 'Жовква', lat: 50.0606, lon: 23.9728, temperature: 8, rainfall: 6, humidity: 84, windSpeed: 3 },
        { id: 10, name: 'Яворів', lat: 49.9303, lon: 23.3938, temperature: 9, rainfall: 5, humidity: 83, windSpeed: 3 },
      ];
      setWeatherData(mockWeatherData);
      setIsLoading(false);
    }, 1000); // Затримка 1 секунда
  };

  // Імітація отримання прогнозу погоди
  const fetchForecastData = async (region) => {
    setIsLoading(true);
    setTimeout(() => {
      const mockForecastData = [
        { date: '2024-11-18', temperature: 9, description: 'Хмарно' },
        { date: '2024-11-19', temperature: 7, description: 'Дощ' },
        { date: '2024-11-20', temperature: 6, description: 'Сонячно' },
      ];
      setForecastData(mockForecastData);
      setIsLoading(false);
    }, 1000); // Затримка 1 секунда
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    fetchForecastData(region.name);
  };

  return (
    <div>
      <h1>Кліматична карта Львівської області</h1>
      <div style={{ height: '100vh', width: '100vw' }}>
        <MapContainer center={[49.8397, 24.0297]} zoom={9} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {weatherData.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lon]}
              icon={CustomIcon}
              eventHandlers={{
                click: () => handleRegionClick(point),
              }}
            >
              <Popup>
                <div>
                  <h3>{point.name}</h3>
                  <p>Температура: {point.temperature}°C</p>
                  <p>Опади: {point.rainfall} мм</p>
                  <p>Вологість: {point.humidity}%</p>
                  <p>Швидкість вітру: {point.windSpeed} м/с</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedRegion && (
        <div>
          <h2>Прогноз погоди для регіону: {selectedRegion.name}</h2>
          {isLoading ? (
            <p>Завантаження...</p>
          ) : (
            <ul>
              {forecastData.map((day, index) => (
                <li key={index}>
                  <strong>{day.date}:</strong> {day.temperature}°C, {day.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherMap;
