from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from dotenv import load_dotenv
import requests


load_dotenv()

# Create your views here.
class CurrentWeatherAPIView(APIView):
    def get(self, request):
        API_KEY = os.getenv('WeatherAPI_key') 
        BASE_URL = 'https://api.weatherapi.com/v1/current.json'

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

        