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
    // Імітація отримання даних з API
    const fetchData = () => {
      const tempData = [15, 17, 20, 22, 18, 19, 21];
      const humData = [70, 65, 60, 75, 80, 85, 78];
      const windData = [5, 10, 7, 12, 9, 15, 8];
      const precipData = [0, 1, 0.5, 0, 2, 0.8, 1.2];
      const timeLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

      setTemperatureData(tempData);
      setHumidityData(humData);
      setWindSpeedData(windData);
      setPrecipitationData(precipData);
      setLabels(timeLabels);
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
        label: 'Швидкість вітру (м/с)',
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
      {/* <h2 className="charts-title">Поточні кліматичні показники</h2> */}
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
