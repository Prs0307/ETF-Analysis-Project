from ETF_services.models import ETF_holdings,ETF,AvailabilityDate
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
    print(etf_list)
    return etf_list

def get_etf_link(etf):

    try:
        link=ETF.objects.filter(etf_shortname=etf).first().etf_link
        return link
        
    except Exception as e:
        print(e)
        raise Exception("etf link not found")
    
def add_EtfStocks_in_DB(dataframe,pending_etfs,valid_etfs):
    updated_etfs=[]
    for etf in valid_etfs:
        if etf not in pending_etfs:updated_etfs.append(etf)
    
    print(dataframe.columns)


          
    try:
            with transaction.atomic():
                etf_objects = []
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
                        etf = ETF_holdings(
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
                        etf_objects.append(etf)
                    
                # Bulk create the ETF objects
                ETF_holdings.objects.bulk_create(etf_objects)
                
        
    except Exception as e:
            print("error in adding single etf stocs",e)
            raise Exception("Error in storing in DB")

    
    
    
    