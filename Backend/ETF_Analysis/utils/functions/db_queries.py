from ETF_services.models import ETF_holdings,ETF,Stock
from django.db import transaction
from datetime import datetime

def parse_date(date_str):
    date_str=str(date_str)
    if date_str and date_str != "-":
        try:
            return datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return None
    return None



def get_etf_list():
    etf_list=list(ETF.objects.values_list('etf_shortname', flat=True))
  
    return etf_list

def stock_details_exists(stock_shortname,stock_name):
    try:
        obj=Stock.objects.get(stock_name=stock_name,stock_shortname=stock_shortname)
        print("stock exist in db",obj)
        return True
    except Exception as e:
        print("exception in stock details exist function:",e)
        return False
    
    
def get_etf_link(etf):

    try:
        link=ETF.objects.filter(etf_shortname=etf).first().etf_link
        return link
        
    except Exception as e:
        print("exception for getting etf link")
        return None
        
    
    
    
def update_stock_table(stock_shortname,stock_name):
    print("stockname and short",stock_shortname,stock_name)
    
    if not stock_details_exists(stock_shortname,stock_name):
        obj=Stock.objects.create(stock_shortname=stock_shortname,stock_name=stock_name)
        print("in update stock table",obj)
        return obj
    else:
        print("exist in db")
        return None
        
def  update_etf_table(etfname,stock):

    if stock!=None:
        print("stock exist",stock.id)
        try:
            etf=ETF.objects.get(etf_name=etfname)
            if not etf.stocks.filter(pk=stock.id).exists():
                print("new stock added for etf")
                etf.stocks.add(stock)
                etf.save()
        except Exception as e:
            print("exception in adding stock for etf",e)
            return None
                
           
       
def add_EtfStocks_in_DB(dataframe,pending_etfs,valid_etfs):
                
                for index, row in dataframe.iterrows():
                  
                    # Check if ETF already exists
                    if_allready_exist=ETF_holdings.objects.filter(ticker=row['ticker'],
                            name=row['name'],
                            sector=row['sector'],
                            asset_class=row['asset_class'],
                            market_value=row['market_value'],
                            weight=row['weight'],
                            notional_value=row['notional_value'],
                            shares=row['shares'],
                            price=row['price'],
                            location=row['location'],
                            exchange=row['exchange'],
                            currency=row['currency'],
                            fx_rate=row['fx_rate'],
                            market_currency=row['market_currency'],
                            etfname=row['etfname'],
                            date=parse_date(row['date']),
                            fund_house=row['fund_house']
                            ).exists()
                    if if_allready_exist:
                        continue
                    else:
                            try:
                                print("try")
                                etf = ETF_holdings.objects.create(
                                        ticker=row['ticker'],
                                        name=row['name'],
                                        sector=row['sector'],
                                        asset_class=row['asset_class'],
                                        market_value=row['market_value'],
                                        weight=row['weight'],
                                        notional_value=row['notional_value'],
                                        shares=row['shares'],
                                        price=row['price'],
                                        location=row['location'],
                                        exchange=row['exchange'],
                                        currency=row['currency'],
                                        fx_rate=row['fx_rate'],
                                        market_currency=row['market_currency'],
                                        etfname=row['etfname'],
                                        date=parse_date(row['date']),
                                        fund_house=row['fund_house']
                                        
                                    )
                            except Exception as e:
                                continue
                    
                # Bulk create the ETF objects
                        
                        
                
   

    
    
    
    