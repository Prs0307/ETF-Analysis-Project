from django.db import models

# Create your models here.
from django.db import models

class ETFData(models.Model):
    ticker = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    asset_class = models.CharField(max_length=255)
    market_value = models.DecimalField(max_digits=20, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    notional_value = models.DecimalField(max_digits=20, decimal_places=2)
    shares = models.DecimalField(max_digits=20, decimal_places=2)
    cusip = models.CharField(max_length=100)
    isin = models.CharField(max_length=100)
    sedol = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return f"{self.ticker} - {self.name}"
