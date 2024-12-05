from django.contrib import admin
from django.urls import path
from api.views import CurrentWeatherAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/current_weather/', CurrentWeatherAPIView.as_view(), name='current_weather_api'),
]
