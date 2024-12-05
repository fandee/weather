from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv
import requests
from datetime import datetime
from urllib.parse import urlencode, urljoin
from pprint import pprint


load_dotenv()

API_KEY = os.getenv('WeatherAPI_key') 
BASE_URL = 'https://api.weatherapi.com/v1/'


# Create your views here.
class CurrentWeatherAPIView(APIView):
    def get(self, request):

        url = BASE_URL + 'current.json'

        params = {
             'q': 'Lviv',
             'key': API_KEY
        }

        try:
            # Запит до стороннього API погоди
            response = requests.get(BASE_URL, params=params)
            if response.status_code == 200:
                data = response.json()
                cur_weather = {
                    'temperature': data['current']['temp_c'],
                    'precip': data['current']['precip_mm'],
                    'wind': data['current']['wind_kph'],
                    'humidity': data['current']['humidity']
                }
                return Response(cur_weather, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Не вдалося отримати дані від API'}, status=response.status_code)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# Getting weather for last hours
class LastHoursWeatherAPIView(APIView):
    def get(self, request):

        # current date and last hours from now
        cur_date = datetime.now().strftime('%Y-%m-%d')
        current_hour = datetime.now().hour
        time_labels = [i for i in range(current_hour, current_hour - 6, -1)][::-1]

        url = BASE_URL + 'history.json'

        params = {
            'q': 'Lviv',
            'dt': cur_date,
            'hour': 0,
            'key': API_KEY
        }

        last_weather = [] # weather for last 6 hours

        for hour in time_labels:
            params['hour'] = hour

            try:
            # Запит до стороннього API погоди
                print(f"{url}?{urlencode(params)}")
                response = requests.get(url, params=params)
                if response.status_code == 200:
                    data = response.json()x
                    data = data['forecast']['forecastday'][0]['hour'][0]
                    weather = {
                        'time': data['time'].split()[1],
                        'temperature': data['temp_c'],
                        'precip': data['precip_mm'],
                        'wind': data['wind_kph'],
                        'humidity': data['humidity']
                    }
                    last_weather.append(weather)
                else:
                    return Response({'error': 'Не вдалося отримати дані від API'}, status=response.status_code)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response(last_weather, status=status.HTTP_200_OK)