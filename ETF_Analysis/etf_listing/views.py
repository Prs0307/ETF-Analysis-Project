from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from .helper_functions import download_and_save_csv


def fetch_daily_stats(request):
    try:
        return JsonResponse({"success": download_and_save_csv()})
    except Exception as e:
        return JsonResponse({"success": "false"})
    
