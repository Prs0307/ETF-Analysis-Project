from datetime import datetime,timedelta
from ETF_services.models import ETF
from utils.functions.db_queries import get_etf_list


def validate_etfs(etfs):
    print("in valid etfs")
    etf_list= get_etf_list()
    
    
    if  not etfs:
        if len((etf_list))<20:
            return etf_list
        else :
            print("adding 20 etfs")
            return etf_list[:20]
        
    valid_etfs=[]
    
    etfs=etfs.split(",")
    for etf in etfs:
        if etf in  etf_list:
            print('valid etf found ',etf)
            valid_etfs.append(etf)
    print("valid etfs are",validate_etfs)
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
        

    
from decimal import Decimal

from decimal import Decimal, InvalidOperation

def str_to_float(s):
    if isinstance(s, str):
        # Remove commas
        raw_num = s.replace(',', '').strip()
        if not raw_num:
            return 0
        
        try:
            # Try to convert to Decimal
            return Decimal(raw_num)
        except Exception as e:
            # Handle invalid decimal conversion
            print(f"InvalidOperation: Could not convert '{raw_num}' to Decimal.")
            return 0
    else:
        # If not a string, return 0
        return 0





def convert_date_format(input_date):
    # Check if input_date has the correct length
    if len(input_date) != 8:
        raise ValueError("Input date string must be in YYYYMMDD format")

    # Extract year, month, and day from input_date
    year = input_date[:4]
    month = input_date[4:6]
    day = input_date[6:8]

    # Create formatted date string
    formatted_date = f"{year}-{month}-{day}"

    return formatted_date

    

