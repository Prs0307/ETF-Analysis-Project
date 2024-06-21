from rest_framework.serializers import ModelSerializer
from .models import *

class ETFSerializer(ModelSerializer):
    class Meta:
        model=ETF
        fields="__all__"

class FundhouseSerializer(ModelSerializer):
    class Meta:
        model=Fundhouse
        fields="__all__"
        