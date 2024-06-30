from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(ETF_holdings)
admin.site.register(Fundhouse)
admin.site.register(Stock)
admin.site.register(ETF)
admin.site.register(AvailabilityDate)