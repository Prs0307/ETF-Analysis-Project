
from django.shortcuts import render
from rest_framework.response import Response
from Backend.ETF_Analysis.utils.db_functions import *
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK,HTTP_201_CREATED,HTTP_400_BAD_REQUEST
from rest_framework.generics import ListAPIView
from Backend.ETF_Analysis.utils.db_functions import fetch_data_from_fund

class Update_funds(APIView):
    def post(self,request,format=None):
        try:
            start_date=request.data.get("start_date",None)
            end_date=request.data.get("start_date",start_date)
            etfs=request.data.get("etfs","").split(",")
            firm=request.data.get("firm",None)
            
            msg=fetch_data_from_fund(start_date,end_date,firm,etfs)
            return Response({"success":True})
        
        
            
            
            
            
            
            
            return Response({"success":True,"message":"data added successfully"},status=HTTP_201_CREATED)
            
        except Exception as e:
            print(e)
            return Response({"success":False,"message":str(e)},status=HTTP_400_BAD_REQUEST)
        
# class  Etf_List(ListAPIView):
#     def get_queryset(self):
#         queryset =  Lead.objects.filter(is_deleted=False).order_by('-id')
#         return queryset
    
        
