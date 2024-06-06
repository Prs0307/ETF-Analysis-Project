# views.py
import requests
import csv
from io import StringIO
import datetime 

def is_valid_day():
    current_day = datetime.now().weekday()
    if current_day == 5 or current_day == 6:
        return True  # Market is closed
    else:
        return False

def download_and_save_csv():
    #first we will check if the date is valid to fetch data
    if not is_valid_day():
        return "market is close  today"
    
    date=str(datetime.datetime.now()).split(" ")[0].split("-")[::-1]
    date="".join(date)

    # URL of the CSV file to download
    # csv_url = 'https://www.ishares.com/us/products/251614/ishares-msci-usa-momentum-factor-etf/1467271812596.ajax?fileType=csv&fileName=MTUM_holdings&dataType=fund&asOfDate={date}'  # Replace with the actual URL
    csv_url=f'https://www.ishares.com/us/products/251614/ishares-msci-usa-momentum-factor-etf/1467271812596.ajax?fileType=csv&fileName=MTUM_holdings&dataType=fund&asOfDate=20240531'

    response = requests.get(csv_url)
      # Check if the request was successful

    # Read CSV content

    csv_file = StringIO(response.text)
    reader = csv.DictReader(csv_file)
    

    selected_rows =[]
    start_row=10
    
    for i, row in enumerate(reader, start=1):
        if start_row <= i:
            selected_rows.append(row)
            print(selected_rows)
        
    if selected_rows:
        return "successfully updated"
    else:
        return "not updated yet!"
    

  