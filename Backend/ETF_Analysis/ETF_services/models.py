from django.db import models

# Create your models here.


class ETF_holdings(models.Model):
    ticker = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    sector = models.CharField(max_length=100)
    asset_class = models.CharField(max_length=100)
    market_value = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    weight = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    notional_value = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    shares = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    price = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    exchange = models.CharField(max_length=100, null=True, blank=True)
    currency = models.CharField(max_length=10, null=True, blank=True)
    fx_rate = models.DecimalField(max_digits=20, decimal_places=4, null=True, blank=True)
    market_currency = models.CharField(max_length=10, null=True, blank=True)
    accrual_date = models.DateField(null=True, blank=True)
    etfname = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateField(blank=True,null=True)
    fund_house=models.CharField(max_length=100,blank=True,null=True)

    def __str__(self):
        return f'{self.ticker} - {self.date}'
    
    class Meta:
        db_table="ETF_holdings"

class Fundhouse(models.Model):
    name=models.CharField(max_length=100,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    
    class Meta:
         db_table="Fundhouse"
    
class Stock(models.Model):
    stock_name=models.CharField(max_length=100)
    stock_shortname=models.CharField(max_length=100)
    
    class Meta:
         db_table="Stock"
class ETF(models.Model):
    etf_name=models.CharField(max_length=100)
    etf_shortname=models.CharField(max_length=30)
    etf_link=models.CharField(max_length=100)
    
    fund_house=models.ForeignKey(Fundhouse,related_name="Etfs",null=True,blank=True,on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    stocks=models.ManyToManyField(Stock,null=True)
    
    
    class Meta:
         db_table="ETF"

class AvailabilityDate(models.Model):
    date=models.DateField(blank=True,null=True)
    is_updated=models.BooleanField(default=False)
    fund_house=models.CharField(max_length=100,null=True,blank=True)
    pending_updates=models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    
    
    
    
    class Meta:
        db_table="AvailabilityDate"
    

    
