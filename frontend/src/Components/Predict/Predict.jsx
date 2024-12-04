import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Predict = () => {
  const [forecastData, setForecastData] = useState([]);
  const [days, setDays] = useState(3);

  useEffect(() => {
    fetchForecastData();
  }, [days]);

  const fetchForecastData = async () => {
    const mockData = [
      { date: '2024-11-24', temperature: 5, humidity: 85, wind_speed: 3.2, precipitation: 2 },
      { date: '2024-11-25', temperature: 7, humidity: 80, wind_speed: 4.1, precipitation: 0 },
      { date: '2024-11-26', temperature: 6, humidity: 78, wind_speed: 3.5, precipitation: 1.2 },
      { date: '2024-11-27', temperature: 8, humidity: 82, wind_speed: 4.0, precipitation: 0.5 },
      { date: '2024-11-28', temperature: 10, humidity: 75, wind_speed: 5.2, precipitation: 0 },
      { date: '2024-11-29', temperature: 9, humidity: 77, wind_speed: 3.8, precipitation: 0.8 },
      { date: '2024-11-30', temperature: 6, humidity: 80, wind_speed: 3.0, precipitation: 1.5 },
      { date: '2024-12-01', temperature: 4, humidity: 85, wind_speed: 2.5, precipitation: 3 }
    ];
    setForecastData(mockData.slice(0, days));
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const chartData = {
    labels: forecastData.map((item) => item.date),
    datasets: [
      {
        label: 'Температура (°C)',
        data: forecastData.map((item) => item.temperature),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Вологість (%)',
        data: forecastData.map((item) => item.humidity),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
      {
        label: 'Вітер (м/с)',
        data: forecastData.map((item) => item.wind_speed),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Опади (мм)',
        data: forecastData.map((item) => item.precipitation),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <h2>Прогноз клімату Львівської області</h2>
      <div>
        <label>Кількість днів прогнозу: </label>
        <select value={days} onChange={handleDaysChange}>
          <option value={3}>3 дні</option>
          <option value={5}>5 днів</option>
          <option value={7}>7 днів</option>
          <option value={10}>10 днів</option>
        </select>
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Predict;
