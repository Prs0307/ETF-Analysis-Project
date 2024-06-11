from django.contrib import admin

from django.urls import path
from .views import fetch_daily_stats
urlpatterns = [
    path('fetch-data/', fetch_daily_stats),
]