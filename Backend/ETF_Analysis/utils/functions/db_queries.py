from ETF_services.models import ETF


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
    
def add_EtfStocks_in_DB(dataframe):
    print(dataframe)
    