"""
URL configuration for ETF_Analysis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import *
urlpatterns = [
    path('update-etfstocks/',EtfStocksListCreate.as_view() ),
    path('update-etfstocks/<pk>/',EtfStocksDetail.as_view() ),
    path('etf-bulk-update/',ETFBulk.as_view()),
    path('etf/',ETFListCreate.as_view()),
    path('etf/<pk>/',ETFDetail.as_view()),
    path('fund-house/',FundhouseListCreate.as_view()),
    path('fund-house/<pk>/',FundhouseDetail.as_view()),
    path('stock/',StockListCreate.as_view()),
    path('stock/<pk>/',StockDetail.as_view()),
    path('download-stock-holdings/',DownloadStockHoldings.as_view()),
    path('etf-stocks/',StocksInETF.as_view()),
    path('filters/',FiltersData.as_view()),


    
]

