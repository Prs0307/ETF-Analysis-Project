import requests 
import pandas as pd
import numpy as np
import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import csv
from io import StringIO
from utils.validators import *
from utils.constants import ISHARE_BASE_URL,ISHARE_DF_COLUMNS
from django.http import Http404
from utils.functions.db_queries import *


def fetch_data_from_Ishare(start_date,end_date,fund_house,etfs=None):
    """
    function:its fetch the data of Ishare etfs from LINKS
    """
  
    if not is_valid_date(start_date,end_date):
        raise Exception("invalid dates format")
        

    valid_etfs=validate_etfs(etfs)
    if not valid_etfs:
        raise Exception("etfs not found")
    print("valid etfs are",valid_etfs)
    
    

    input_dates=valid_dates_(start_date,end_date)
    pending_etfs=[]
    
    for date in input_dates:
        # For Perticuler Ticker [ETF] we need to check for its data from link available or not

        for etf in valid_etfs:
            curr_etf_link=get_etf_link(etf)
            
            if curr_etf_link=="" or " " or None:
                pending_etfs.append(etf)
                continue
            
            current_csv_url=ISHARE_BASE_URL+fetch_csv_url_from_web(curr_etf_link)+'&asOfDate='+date
            if not current_csv_url:
                pending_etfs.append(etf)
                continue
            
            current_dataframe=download_and_save_csv(etf,current_csv_url,date,fund_house)
            
            if not current_dataframe:
                pending_etfs.append(etf)
                continue
               
            if current_dataframe.shape[0]<0:
                pending_etfs.append(etf)
                continue
            
            
            #saving current dataframe in db
            
            clean_dataframe=cleaned_dataframe(current_dataframe)
            
            if clean_dataframe.shape[0]==0:
                pending_etfs.append(etf)
                continue
            
            
            #saving dataframe in databse
            add_EtfStocks_in_DB(clean_dataframe)
            
                
                
            

              

    
  


def convert_json_to_df(data):
    """function: this function takes the list of dictionaries(eg. [{},{},{}]) as input and create dataframe from it and return it """
    final_array=[]
  
    #iterating each row
    for json_data in data:
        try:
            keys=list(json_data.keys())
            if len(keys)==2 and len(json_data[None])>10 :
                ticker=json_data[keys[0]] or None
                name=json_data[keys[1]][0] or None
                sector=json_data[keys[1]][1] or None
                asset_class=json_data[keys[1]][2] or None
                market_value=json_data[keys[1]][3] or None
                weight=json_data[keys[1]][4] or None
                notional_value=json_data[keys[1]][5] or None
                shares=json_data[keys[1]][6] or None
                price=json_data[keys[1]][7] or None
                location=json_data[keys[1]][8] or None
                exchange=json_data[keys[1]][9] or None
                currency=json_data[keys[1]][10] or None
                fx_rate=json_data[keys[1]][11] or None
                market_currency=json_data[keys[1]][12] or None
                accrual_date=json_data[keys[1]][13] or None
                
                final_array.append([ticker,name,sector,asset_class,market_value,weight,notional_value,shares,price,location,exchange,currency,fx_rate,market_currency ,accrual_date])

            else:
                return None
        except Exception as e:
            print("error in convert json",json_data)
            return None
        
    return pd.DataFrame(final_array,columns=ISHARE_DF_COLUMNS[-3:])



def download_and_save_csv(etfname,csv_url,date,fund_house):
    """function: it takes csv url as input and fetch the data from csv"""
    try:
        response = requests.get(csv_url)
        csv_file = StringIO(response.text)
        reader = csv.DictReader(csv_file)
    
    except Exception as e:
       print("exception in downloa d and csave",e)
       return None

   

    selected_rows =[]
    start_row=10
    # end_row=20
    
    for i, row in enumerate(reader, start=1):
        if start_row <= i:
            selected_rows.append(row)

    if selected_rows:
        dataframe=convert_json_to_df(selected_rows)
        if dataframe:
            dataframe['etfname']=etfname
            dataframe['date']=date
            dataframe["fund_house"]=fund_house
            return dataframe
            
        
        

     
        
    else:
        return None
    
    
def fetch_csv_url_from_web(webpage_url):
    """function :this function takes webpage url as input and fetch the csv url"""
    try:
        response = requests.get(webpage_url)
        if response.status_code == 200:
            # Parse the HTML content
            soup = BeautifulSoup(response.content, 'html.parser')

            # Find all anchor tags with .csv links
            csv_links = soup.find_all('a',class_='icon-xls-export')
                                   
            # <a class="icon-xls-export" href="/us/products/239726/ishares-core-sp-500-etf/1467271812596.ajax?fileType=csv&amp;fileName=IVV_holdings&amp;dataType=fund" data-link-event="holdings:holdings">Detailed Holdings and Analytics</a>

            # Extract the href attribute from the first .csv link found
            if csv_links:
                csv_link = csv_links[0]['href']
                return csv_link
            else:
                print("No .csv link found on the webpage.")
                return None
        else:
            print(f"Error fetching webpage: {response.status_code}")
            return None
    except Exception as e:
        print(e,'exception occured')
        return None



def cleaned_dataframe(main_dataframe):
    """takes single etf dataframe as input and clean it and return it """
    
        # remove  Empty rows
    df = df.dropna(how='all')  
    # function to convert string values to numbers
    list_of_col=['market_value' , 'weight', 'notional_value' ,'shares',	'price'	,'fx_rate']
    for col_name in (list_of_col):
        df[col_name]=df[col_name].apply(str_to_int)
        df[col_name]=df[col_name].astype("float64")
    # function to convert datetime values to datetime objects

    df['date'] = pd.to_datetime(df['date'], format='%Y%M%d').dt.date

        
    # print(df.head)
    # print(df['date'])
    return df
    
    