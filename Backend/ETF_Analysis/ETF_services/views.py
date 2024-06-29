
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
import pandas as pd
from ETF_Analysis.pagination import PaginationSize20


class EtfStocksListCreate(ListAPIView):
    """This view use for bulk updating daily stock data and getting list of stocks"""
    
    filter_backends = [DjangoFilterBackend]
    serializer_class =  ETFHoldingSerializer
    pagination_class = PaginationSize20
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
        page_param = self.request.query_params.get("page")
        if page_param:
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return Response(self.get_paginated_response(serializer.data))
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
    
    
    def put(self,request,pk):
        pass
    def delete(self,request,pk):
        
        # inst=self.get_object(pk)
        # inst.delete()
        # return Response({"success":True,"message":"successfully deleted"})
    
        ETF_holdings.objects.all().delete()
        return Response({"success":True,"message":"deleted"})
    

class ETFBulk(APIView):
    
    """this api is for adding etf list of different fundhouses,
    It takes csv file as input,please make sure that column names
    of csv file must be synchronous with db table"""
    
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
                    return Response({"success":False,"message":"error in csv file.please check the file"},status=HTTP_400_BAD_REQUEST)
                
                row_count += 1
            
        try:
            with transaction.atomic():
                ETF.objects.bulk_create(etfs)
                
        except Exception as e:
            print(e)
            return Response({"success":False,"message":"error while updating"},status=HTTP_400_BAD_REQUEST)
            
        return Response({"success":True,"message":"data added successfully"},status=HTTP_201_CREATED)
    
class ETFListCreate(ListAPIView):
    
    """this api is for listing all etfs details and also to add etf details seperatly"""
    
    queryset = ETF.objects.all()
    serializer_class = ETFSerializer

    
class ETFDetail(APIView) :
    
    """this api takes pk for identifying the etf and perform operation on it"""
    
    def get_object(self,pk):
        try:
            return ETF.objects.get(pk=pk)
        except ETF.DoesNotExist:
            raise Http404("etf not found")
        
    def get(self,request,pk):
        inst=self.get_object(pk)
        serializer=ETFSerializer(inst)
        return Response(serializer.data,status=HTTP_200_OK)
    
    def put(self,request,pk):
        inst=self.get_object(pk)
        serializer=ETFSerializer(instance=inst,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
            
        
    def delete(self,request,pk):
        ETF.objects.all().delete()
        return Response({"success":"true","message":"bulk deleted"},status=HTTP_201_CREATED)
    
class FundhouseListCreate(APIView):
    """Fund house list and create api"""
    
    def get_queryset(self):
        queryset =  Fundhouse.objects.filter().order_by('-id')
        return queryset
    
    def get(self,request):
        serializer=FundhouseSerializer(self.get_queryset(),many=True)
        return Response(serializer.data,status=HTTP_200_OK)
    
    def post(self,request):
        fund_house=request.data.get("fund_house",None)
        
        if fund_house:
            
            if Fundhouse.objects.filter(name=fund_house).exists():
                return Response({"message":"fundhouse allready exist"})
            
            serializer=FundhouseSerializer(data={"name":fund_house})
            if serializer.is_valid():
                serializer.save()
                return Response({"success":"true","message":"fundhouse added"},status=HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
        
        return Response({"success":False,"message":"all fields are necessary"},status=HTTP_400_BAD_REQUEST)
class FundhouseDetail(APIView) :
    """Fundhouse crud on single object"""
    
    def get_object(self,pk):
        try:
            return Fundhouse.objects.get(pk=pk)
        except Fundhouse.DoesNotExist:
            raise Http404("firm not found")
    
    def get(self,request,pk):
        inst=self.get_object(pk)
        serializer=FundhouseSerializer(inst)
        return Response(serializer.data,status=HTTP_200_OK)
    
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
        return Response({"message":"deleted"},status=HTTP_200_OK)
        
class StockListCreate(ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    
class StockDetail(APIView):
    
    def get_object(self,pk):
        try:
            return Stock.objects.get(pk=pk)
        except ETF_holdings.DoesNotExist:
            raise Http404("stock not found")
        
    def get(self,request,pk):
        inst=self.get_object(pk)
        serializer=StockSerializer(inst)
        return Response(serializer.data,status=HTTP_200_OK)
    
    
    def put(self,request,pk):
        pass
    def delete(self,request,pk):
        
        inst=self.get_object(pk)
        inst.delete()
        return Response({"success":True,"message":"deleted"},status=HTTP_200_OK)
    

class DownloadStockHoldings(APIView):
    
    def get_queryset(self, start_date, end_date, fund_house, etfs):
        try:
            if start_date==None and end_date==None:
                return ETF_holdings.objects.all()
            
            if end_date==None:
                return ETF_holdings.objects.filter(date__gte=start_date)
            
            if start_date==None:
                return ETF_holdings.objects.filter(date__lte=end_date)
            
                
            queryset = ETF_holdings.objects.filter(date__range=[start_date, end_date])
            if fund_house:
                queryset = queryset.filter(fund_house__in=fund_house.split(","))
            if etfs:
                queryset = queryset.filter(etf__in=etfs.split(","))
                
            return queryset
    
        except  Exception as e:
            
            print("error in input fields",e)
            raise Http404("please check input fields")
           
    
    def get(self, request):
        # Get query parameters from request
        start_date = request.query_params.get('start_date',None)
        end_date = request.query_params.get('end_date',None)
        fund_house = request.query_params.get('fund_house',None)
        etfs = request.query_params.getlist('etfs',None)
        
        # Fetch queryset based on parameters
        queryset = self.get_queryset(start_date, end_date, fund_house, etfs)
        
        # Convert queryset to DataFrame
        data = list(queryset.values())
        df = pd.DataFrame(data)
        
        # Create CSV file in memory
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="stock_holdings.csv"'
        df.to_csv(path_or_buf=response, index=False)
        
        return response
        


class StocksInETF(APIView):
    def get(self, request):
        etfname=request.query_params.get('param_name', None)
        
        if etfname:
            stocks=ETF_holdings.objects.filter(etfname=etfname).distinct().values_list("ticker","name")
            return Response({"stocks":stocks},status=HTTP_200_OK)
        
        else:
            return Response({"success":False,"message":"etf not found"}, status=HTTP_400_BAD_REQUEST)
            
       
    
            
class FiltersData(APIView):
    def get(self,request):
        try:
            sector=ETF_holdings.objects.filter().values_list("sector",flat=True).distinct()
          
            filters={
                "sector":sector
            }
            return Response(filters,status=HTTP_200_OK)
        except Exception as e:
            return Response({"success":"false","message":"server error"},status=HTTP_400_BAD_REQUEST)
           
        
 