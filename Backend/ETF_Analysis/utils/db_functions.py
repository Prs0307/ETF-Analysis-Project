# import requests 
# import pandas as pd
# import numpy as np
# import os
# import requests
# from bs4 import BeautifulSoup
import re
from datetime import datetime
import csv
from io import StringIO
from .validators import *

df_column_names = [
    "ticker",
    "name",
    "sector",
    "asset_class",
    "market_value",
    "weight",
    "notional_value",
    "shares",
    "price",
    "location",
    "exchange",
    "currency",
    "fx_rate",
    "market_currency",
    "accrual_date",
    "etfname",
    "date",
]



def fetch_data_from_fund(start_date,end_date,firm,etfs=None):
    """
    function:its fetch the data of etf from url
    """
    return "true"
    BASE_URL='https://www.ishares.com/'
    valid_date,err= is_valid_date(start_date,end_date)
    if(err):
        print(err)
        return
    valid_etfs=is_valid_etfs(etfs)
    if not valid_etfs:
        return " error : ETFs not found in our database"
    # print( "valid Etfs are "+str(valid_etfs))
    main_data_frame=pd.DataFrame({},columns=df_column_names)


    input_dates=valid_dates_(start_date,end_date)

    
    for date in input_dates:
        # For Perticuler Ticker [ETF] we need to check for its data from link available or not

        for etf in valid_etfs:
            curr_etf_link=ishare_df[ishare_df['ticker']==etf]['link'].values[0]
            
            try:
                curr_csv_url=BASE_URL+fetch_csv_url_from_web(curr_etf_link)+'&asOfDate='+date
                print(curr_csv_url)
                data_frame=download_and_save_csv(etf,curr_csv_url,date)
                print("new data frame",data_frame)
                # print("main_data",main_data_frame.head())
                # print("curr_df",data_frame.head())
                if data_frame.shape[0]>0:
                    main_data_frame= pd.concat([main_data_frame,data_frame],ignore_index=True)


                # print("data saved for ETF : {}  and date : {}",format(etf,date))
            except Exception as e:
                print(e)
                return "Data is not available for this period..."
            


            

        # print(str(curr_etf_link))
    if(main_data_frame.shape[0]==0):
        return "No data for this period"
    else:
        main_data_frame.to_csv(f'ETF_{etfs[0]}.csv')
    return "Data Saved For this period"
  


def convert_json_to_df(data):
    """function: this function takes the list of dictionaries(eg. [{},{},{}]) as input and create dataframe from it and return it """
    final_array=[]
    print("len of data",len(data))
    
    for json_data in data:
        try:
            keys=list(json_data.keys())
            if len(keys)==2 and len(json_data[None])>10 :
                print(json_data)
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
                return pd.DataFrame(final_array,columns=df_column_names)
        except Exception as e:
            print("error in convert json",json_data)
            return pd.DataFrame({},columns=df_column_names)
        
    return pd.DataFrame(final_array,columns=df_column_names)



def download_and_save_csv(etfname,csv_url,date):
    """function: it takes csv url as input and fetch the data from csv"""
   
    response = requests.get(csv_url)
    csv_file = StringIO(response.text)
    reader = csv.DictReader(csv_file)

   

    selected_rows =[]
    start_row=10
    # end_row=20
    
    for i, row in enumerate(reader, start=1):
        if start_row <= i:
            selected_rows.append(row)

    if selected_rows:
      
        
        data=convert_json_to_df(selected_rows)
        data['etfname']=etfname
        data['date']=date
        return data

     
        
    else:
        print("not available")
        return pd.DataFrame({},columns=df_column_names)
    
    
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



def clean_dataframe(single_etf_dataframe):
    """takes single etf dataframe as input and clean it and return it """
    return None