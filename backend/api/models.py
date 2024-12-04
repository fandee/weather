from django.db import models

# Create your models here.
class Weather (models.Model):
    temperature = models.IntegerField()