# Generated by Django 5.1.3 on 2024-12-05 15:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_currentweather'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Weather',
        ),
    ]