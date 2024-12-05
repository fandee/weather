import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './ClimateCharts.css';

export const ClimateCharts = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [windSpeedData, setWindSpeedData] = useState([]);
  const [precipitationData, setPrecipitationData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запит до бекенду
        const response = await fetch('http://127.0.0.1:8000/api/last_weather/');
        if (!response.ok) {
          throw new Error('Не вдалося отримати дані від API');
        }
        const data = await response.json();

        // Обробка даних
        const tempData = data.map(item => item.temperature);
        const humData = data.map(item => item.humidity);
        const windData = data.map(item => item.wind);
        const precipData = data.map(item => item.precip);
        const timeLabels = data.map(item => item.time);

        setTemperatureData(tempData);
        setHumidityData(humData);
        setWindSpeedData(windData);
        setPrecipitationData(precipData);
        setLabels(timeLabels);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };

    fetchData();
  }, []);

  const temperatureChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Температура (°C)',
        data: temperatureData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const humidityChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Вологість (%)',
        data: humidityData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const windSpeedChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Швидкість вітру (км/год)',
        data: windSpeedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const precipitationChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Опади (мм)',
        data: precipitationData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="climate-charts-container">
      <div className="chart-container">
        <div className="chart-item">
          <Line data={temperatureChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="chart-item">
          <Line data={humidityChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="chart-item">
          <Line data={windSpeedChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="chart-item">
          <Line data={precipitationChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};
