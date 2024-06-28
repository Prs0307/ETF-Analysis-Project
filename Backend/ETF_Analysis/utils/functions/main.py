from .ishare import fetch_data_from_Ishare
from django.http import Http404



def fetch_data_from_fund(start_date,end_date,fund_house,etfs=None):
    if fund_house=="IShare":
        fetch_data_from_Ishare(start_date,end_date,fund_house,etfs)
    else:
        raise Http404("fund house not found!")
        
    
        
    