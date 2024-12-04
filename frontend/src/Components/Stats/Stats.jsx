import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Stats.css';

const Stats = () => {
  const [climateData, setClimateData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 7)); // Встановлення кінцевої дати на поточний місяць
  const [granularity, setGranularity] = useState('months'); // Додавання гранулярності
  const chartRef = useRef(null);

  useEffect(() => {
    // Імітація отримання даних з API
    const fetchClimateData = async () => {
      // Імітація затримки запиту
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Генерація фейкових даних для більшого періоду
      const labels = [];
      const temperature = [];
      const precipitation = [];
      const windSpeed = [];
      const humidity = [];
      const data = [];

      const start = new Date(startDate);
      const end = new Date(endDate);
      let current = new Date(start);

      while (current <= end) {
        let label;
        switch (granularity) {
          case 'days':
            // Поділ на дні
            const day = current.getDate();
            const month = current.toLocaleString('default', { month: 'long' });
            const year = current.getFullYear();
            label = `${day} ${month} ${year}`;
            current.setDate(current.getDate() + 1);
            break;
          case 'weeks':
            // Поділ на тижні
            const week = Math.ceil(current.getDate() / 7);
            label = `Тиждень ${week}, ${current.toLocaleString('default', { month: 'long' })} ${current.getFullYear()}`;
            current.setDate(current.getDate() + 7);
            break;
          case 'months':
            // Поділ на місяці
            label = `${current.toLocaleString('default', { month: 'long' })} ${current.getFullYear()}`;
            current.setMonth(current.getMonth() + 1);
            break;
          case 'years':
            // Поділ на роки
            label = `${current.getFullYear()}`;
            current.setFullYear(current.getFullYear() + 1);
            break;
          default:
            break;
        }

        labels.push(label);
        const temp = Math.floor(Math.random() * 25) - 5; // Генерація температури від -5 до 20°C
        const precip = Math.floor(Math.random() * 100); // Генерація опадів від 0 до 100 мм
        const wind = Math.floor(Math.random() * 15) + 1; // Генерація швидкості вітру від 1 до 15 м/с
        const hum = Math.floor(Math.random() * 50) + 50; // Генерація вологості від 50% до 100%

        temperature.push(temp);
        precipitation.push(precip);
        windSpeed.push(wind);
        humidity.push(hum);
        data.push({ date: label, temperature: temp, precipitation: precip, windSpeed: wind, humidity: hum });
      }

      const fakeData = {
        labels,
        temperature,
        precipitation,
        windSpeed,
        humidity,
        data,
      };

      setClimateData(fakeData);
    };

    fetchClimateData();
  }, [startDate, endDate, granularity]);

  useEffect(() => {
    if (climateData) {
      const chartConfig = {
        type: 'line',
        data: {
          labels: climateData.labels,
          datasets: [
            {
              label: 'Температура (°C)',
              data: climateData.temperature,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Опади (мм)',
              data: climateData.precipitation,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
            {
              label: 'Швидкість вітру (м/с)',
              data: climateData.windSpeed,
              borderColor: 'rgba(255, 159, 64, 1)',
              fill: false,
            },
            {
              label: 'Вологість (%)',
              data: climateData.humidity,
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      };

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(document.getElementById('climateChart'), chartConfig);
    }
  }, [climateData]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleGranularityChange = (event) => {
    setGranularity(event.target.value);
  };

  return (
    <div className="statistics-container">
      <h2>Статистика клімату</h2>
      <div className="period-selector">
        <label htmlFor="start-date">Виберіть початкову дату: </label>
        <input type="month" id="start-date" value={startDate} onChange={handleStartDateChange} min="2000-01" max={new Date().toISOString().slice(0, 7)} />
        <label htmlFor="end-date">Виберіть кінцеву дату: </label>
        <input type="month" id="end-date" value={endDate} onChange={handleEndDateChange} min={startDate} max={new Date().toISOString().slice(0, 7)} />
        <label htmlFor="granularity">Виберіть поділ даних: </label>
        <select id="granularity" value={granularity} onChange={handleGranularityChange}>
          <option value="days">Дні</option>
          <option value="weeks">Тижні</option>
          <option value="months">Місяці</option>
          <option value="years">Роки</option>
        </select>
      </div>
      <div className="chart-container">
        <canvas id="climateChart"></canvas>
      </div>
      {climateData && (
        <div className="table-container">
          <h3>Таблиця кліматичних даних</h3>
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Температура (°C)</th>
                <th>Опади (мм)</th>
                <th>Швидкість вітру (м/с)</th>
                <th>Вологість (%)</th>
              </tr>
            </thead>
            <tbody>
              {climateData.data.map((dataPoint, index) => (
                <tr key={index}>
                  <td>{dataPoint.date}</td>
                  <td>{dataPoint.temperature}</td>
                  <td>{dataPoint.precipitation}</td>
                  <td>{dataPoint.windSpeed}</td>
                  <td>{dataPoint.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="analysis-container">
        <h3>Аналіз змін клімату</h3>
        <p>
          Порівняння поточних даних із попередніми роками показує тенденції та аномалії в температурі, опадах, швидкості вітру та вологості.
          Загалом, ми спостерігаємо, що середні температури зросли за останні кілька років, що вказує на тенденцію до потепління.
          Крім того, ми виявили кілька випадків аномального рівня опадів і змін у швидкості вітру, що може бути пов'язано з наслідками змін клімату.
        </p>
      </div>
    </div>
  );
};

export default Stats;
