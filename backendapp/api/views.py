from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.shortcuts import render

from .models import *
from .serializers import *

class DefinitionView(ModelViewSet):
    queryset = Definition.objects.all()
    serializer_class = DefinitionSerializer
    
class UsageView(ModelViewSet):
    queryset = Usage.objects.all()
    serializer_class = UsageSerializer