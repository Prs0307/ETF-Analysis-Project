from datetime import datetime,timedelta

def is_valid_etfs(etfs):
    valid_etfs=[]
    for etf in etfs:
        # print(etf)
        
        if etf in  list(ishare_df['ticker']):
            print('valid etf found ',etf)
            valid_etfs.append(etf)
    return valid_etfs



def is_valid_date(startdate,enddate):
    err=""
    try:
        # Parse dates with flexible formatting for single-digit days/months
        start_date = datetime.strptime(startdate, "%Y/%m/%d")
        end_date = datetime.strptime(enddate, "%Y/%m/%d")
    except ValueError:
         err="Format Error"
         return False,err  # Handle invalid date format

    # Check if start date is less than or equal to end date
    if((start_date <= end_date)==False):
       err='"Start Date must be less than or  equal to end date"'
    return start_date <= end_date,err


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
        

    

    
