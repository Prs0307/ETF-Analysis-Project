
from django.shortcuts import render
from rest_framework.response import Response
from utils.functions.main import *
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK,HTTP_201_CREATED,HTTP_400_BAD_REQUEST
from rest_framework.generics import ListAPIView
import csv
from django.http import JsonResponse
from .models import *
from django.http import HttpResponse
from django.db import transaction, IntegrityError
from .serializers import *
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend




class EtfStocksListCreate(ListAPIView):
    """This view use for bulk updating daily stock data and getting list of stocks"""
    
    filter_backends = [DjangoFilterBackend]
    serializer_class =  ETFHoldingSerializer
    filterset_fields= {
            "ticker": ["exact", "icontains"],
            "name": ["exact", "icontains"],
            "sector": ["exact", "icontains"],
            "asset_class": ["exact", "icontains"],
            "market_value": ["exact", "gte", "lte"],
            "weight": ["exact", "gte", "lte"],
            "notional_value": ["exact", "gte", "lte"],
            "shares": ["exact", "gte", "lte"],
            "price": ["exact", "gte", "lte"],
            "location": ["exact", "icontains"],
            "exchange": ["exact", "icontains"],
            "currency": ["exact"],
            "fx_rate": ["exact", "gte", "lte"],
            "market_currency": ["exact"],
            "etfname": ["exact", "icontains"],
            "date": ["exact", "gte", "lte"],
            "fund_house": ["exact", "icontains"]
        }
    

    def get_queryset(self):
        return ETF_holdings.objects.all()
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        try:
            start_date=request.data.get("start_date",None)
            end_date=request.data.get("end_date",start_date)
            etfs=request.data.get("etfs",None)
            fund_house=request.data.get("fund_house",None)
            
            fetch_data_from_fund(start_date,end_date,fund_house,etfs)
            return Response({"success":True,"message":"stocks updated"})
        except Exception as e:
            
            return Response({"success":False,"message":str(e)})
        
class EtfStocksDetail(APIView):
    def get_object(self,pk):
        try:
            return ETF_holdings.objects.get(pk=pk)
        except ETF_holdings.DoesNotExist:
            raise Http404("holding not found")
        
    def get(self,request,pk):
        inst=self.get_object(pk)
        serializer=ETFHoldingSerializer(inst)
        return Response(serializer.data)
    
    
    def put():...
    def delete(self,request,pk):
        
        # count=list(ETF_holdings.objects.all())
        # return Response({"count":len(count)})
    
        ETF_holdings.objects.all().delete()
        return Response({"success":True,"message":"deleted"})
    

class ETFBulk(APIView):
    def post(self,request):
       
        csv_file = request.FILES.get("file",None)
        fund_house=request.data.get("fund_house",None)
    
        if ((csv_file==None) or ( fund_house==None)):
            return Response({"success":False,"message":"please enter valid details"})
        
        try:
            fund_house=Fundhouse.objects.get(pk=int(fund_house))

        except Fundhouse.DoesNotExist:
            return Response({"success":False,"message":"fundhouse not found"})
        
        decoded_file = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        
        
        row_count = 0
        etfs=[]
        for i, row in enumerate(reader):
            if i == 0:
                # Skip the first row (header)
                continue
            else :
                try:
                    etf_name = row['etf']
                    etf_shortname = row['ticker']
                    etf_link = row['link']
                    fund_house=fund_house
                    
                    # Check if the ETF with these details already exists
                    if not ETF.objects.filter(etf_name=etf_name, etf_shortname=etf_shortname, etf_link=etf_link,fund_house=(fund_house)).exists():
                        etf = ETF(
                            etf_name=etf_name,
                            etf_shortname=etf_shortname,
                            etf_link=etf_link,
                           fund_house=(fund_house)
                        )
                        etfs.append(etf)
                        
                    
                except Exception as e:
                    print(e)
                    return Response({"success":False,"message":"error in csv file.please check the file"})
                
                row_count += 1
            
        try:
            with transaction.atomic():
                ETF.objects.bulk_create(etfs)
                
        except Exception as e:
            print(e)
            return Response({"success":False,"message":"error while updating"})
            
        return Response({"success":True,"message":"data added successfully"})
    
class ETFListCreate(ListAPIView):
    queryset = ETF.objects.all()
    serializer_class = ETFSerializer
    
    
class ETFDetail(APIView) :
    def get_object(self,pk):
        try:
            return ETF.objects.get(pk=pk)
        except ETF.DoesNotExist:
            raise Http404("etf not found")
        
    def get(self,request,pk):
        inst=self.get_object(pk)
        serializer=ETFSerializer(inst)
        return Response(serializer.data)
    
    def put(self,request,pk):
        inst=self.get_object(pk)
        serializer=ETFSerializer(instance=inst,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
            
        
        
    def delete(self,request,pk):
        ETF.objects.all().delete()
        return Response({"success":"true","message":"bulk deleted"})
    
    
    
    
class FundhouseListCreate(APIView):
    
    def get_queryset(self):
        queryset =  Fundhouse.objects.filter().order_by('-id')
        return queryset
    
    def get(self,request):
        serializer=FundhouseSerializer(self.get_queryset(),many=True)
        return Response(serializer.data)
    
    def post(self,request):
        fund_house=request.data.get("fund_house",None)
        
        if fund_house:
            
            if Fundhouse.objects.filter(name=fund_house).exists():
                return Response({"message":"fundhouse allready exist"})
            
            serializer=FundhouseSerializer(data={"name":fund_house})
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"true","message":"fundhouse added"})
            else:
                return Response(serializer.errors)
        
        return Response({"success":False,"message":"all fields are necessary"})
class FundhouseDetail(APIView) :
    def get_object(self,pk):
        try:
            return Fundhouse.objects.get(pk=pk)
        except Fundhouse.DoesNotExist:
            raise Http404("firm not found")
    
    def get(self,request,pk):
        inst=self.get_object(pk)
        serializer=FundhouseSerializer(inst)
        return Response(serializer.data)
    
    def put(self,request,pk):
        
        inst=self.get_object(pk)
        serializer=FundhouseSerializer(instance=inst,data=request.data,partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            
           return Response(serializer.errors)
       
    def delete(self,request,pk):
        inst=self.get_object(pk)
        inst.delete()
        return Response({"message":"deleted"})
        
        
    
        
            
            
            
            
            
            
    

