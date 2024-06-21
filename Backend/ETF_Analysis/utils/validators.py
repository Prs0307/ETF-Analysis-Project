from datetime import datetime,timedelta
from ETF_services.models import ETF
from utils.functions.db_queries import get_etf_list


def validate_etfs(etfs):
    etf_list= get_etf_list()
    
    
    if not etfs.split(","):
        if len((etf_list))<20:
            return etf_list
        else :
            return etf_list[:20]
        
    valid_etfs=[]
    
    for etf in etfs:
        
        if etf in  etf_list:
            print('valid etf found ',etf)
            valid_etfs.append(etf)
    return valid_etfs



def is_valid_date(startdate,enddate):
    try:
        # Parse dates with flexible formatting for single-digit days/months
        start_date = datetime.strptime(startdate, "%Y/%m/%d")
        end_date = datetime.strptime(enddate, "%Y/%m/%d")
    except Exception as e:
        print("------dates are invalid-----")
        print(e)
        return False
    
    

    return start_date <= end_date,


def valid_dates_(start_date,end_date):
            
        try:
            # Attempt to convert the string to a datetime object using the specified format
            start_date = datetime.strptime(start_date, "%Y/%m/%d")
            end_date = datetime.strptime(end_date, "%Y/%m/%d")

        except ValueError:
            print(f"Error: Invalid date format. Please check the format of your string date.")


        date_range=[]
        # Loop through dates with a daily step
        for current_date in range((end_date - start_date).days + 1):
            date_to_process = start_date + timedelta(days=current_date)
            # Do something with the date
            date_range.append("".join(str(date_to_process.strftime("%Y/%m/%d")).split("/")))
        return date_range
        

    

def str_to_int(s):
    if isinstance(s, str):
        raw_num=s.replace(',','')
    
        return float(raw_num)
    else:
        return s
