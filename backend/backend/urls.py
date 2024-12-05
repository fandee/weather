from django.contrib import admin
from django.urls import path
from api.views import CurrentWeatherAPIView
from api.views import LastHoursWeatherAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/current_weather/', CurrentWeatherAPIView.as_view(), name='current_weather_api'),
    path('api/last_weather/', LastHoursWeatherAPIView.as_view(), name='last_weather_api')
]
