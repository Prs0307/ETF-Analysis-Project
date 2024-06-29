import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
import locale
from locale import atof


def holding_analysis(df, etfname, holding_name):  # function for holding analysis

    temp = df[df['etfname'] == etfname]
    main = temp[temp['ticker'] == holding_name]
    #main['date'] = main['date'].apply(str_to_date)
    #main['date'] = pd.to_datetime(main['date'])
    raw = main[['date', 'weight']]
    raw.set_index('date', inplace=True)
    raw["weight"] = raw["weight"].astype(float)
    print(raw['weight'])

    model = ARIMA(raw['weight'], order=(1, 1, 1))  # Example parameters (p=1, d=1, q=1)
    model_fit = model.fit()

    forecast = model_fit.forecast(steps=1)

    temp = {'holding': holding_name, 'date': forecast.keys()[0],
            'weight': forecast[forecast.keys()[0]] if forecast[forecast.keys()[0]] > 0 else 0}

    return temp


def holding_analysis1(df, etfname, holding_name):  # function for holding analysis

    temp = df[df['etfname'] == etfname]
    main = temp[temp['ticker'] == holding_name]
    #main['date'] = main['date'].apply(str_to_date)
    #main['date'] = pd.to_datetime(main['date'])
    temp1 = main[['date', 'price']]
    temp1.set_index('date', inplace=True)
    '''locale.setlocale(locale.LC_NUMERIC, '')'''
    temp1['price'] = temp1['price'].astype(float)

    prev_price = list(temp1.tail(1)['price'])[0]

    model = ARIMA(temp1['price'], order=(1, 1, 1))  # Example parameters (p=1, d=1, q=1)
    model_fit = model.fit()

    forecast = model_fit.forecast(steps=1)

    p_price = {'price': forecast[forecast.keys()[0]], 'previous_price': prev_price}

    return p_price

def holding_analysis_details(df,etfname):
    newdf=pd.DataFrame({
    'holding':[],
    'date':[],
    'weight':[],
    'price':[],
    'previous_price':[],
    })
    temp = df[df['etfname'] == etfname]
    holding_list=temp['ticker'].unique()
    print(holding_list)
    for i in holding_list:
        temp=holding_analysis(df,etfname,i)
        t1=holding_analysis1(df,etfname,i)
        temp['price']=t1['price']
        temp['previous_price']=t1['previous_price']
        newdf = newdf._append(temp, ignore_index = True)
    return newdf