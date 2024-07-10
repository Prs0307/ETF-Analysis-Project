from django.shortcuts import render
from django.http.response import JsonResponse
from ETF_services.models import ETF_holdings
import pandas as pd
# Create your views here.



def predict_price(request):
    # etfname , stockname ,filtername

    try:
        etfname = request.GET['etfname']
        stockname = request.GET['stockname']
        filtername = request.GET['filtername']
        stock_data = ETF_holdings.objects.filter(etfname=etfname,stockname=stockname).values_list(str(filtername),'date')
        df = pd.DataFrame(stock_data)
         # print(df.info())
         # holding_analysis_details(df,'ILF')

     # return HttpResponse('Done')   

    except KeyError:
        return JsonResponse({"error": "Missing required parameter(s)."}, status=400) 
    return JsonResponse({})
    # 
        

# def predict_share(request):
#     df = ETF_holdings.objects.all().values()
#     df = pd.DataFrame(df)
#     print(df.info())
#     holding_analysis_details(df,'ILF')

#     return HttpResponse('Done')           

# def predict_weight(request):
#     df = ETF_holdings.objects.all().values()
#     df = pd.DataFrame(df)
#     print(df.info())
#     holding_analysis_details(df,'ILF')

#     return HttpResponse('Done')           