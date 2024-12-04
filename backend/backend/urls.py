from django.contrib import admin
from django.urls import path
from api.views import WeatherDataView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('weather/', WeatherDataView.as_view()),
]
