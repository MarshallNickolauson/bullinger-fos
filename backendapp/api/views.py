from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.shortcuts import render

from .models import *
from .serializers import *

class IntroductionView(ModelViewSet):
    queryset = Introduction.objects.all()
    serializer_class = IntroductionSerializer

class DefinitionView(ModelViewSet):
    queryset = Definition.objects.all()
    serializer_class = DefinitionSerializer
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
class UsageView(ModelViewSet):
    queryset = Usage.objects.all()
    serializer_class = UsageSerializer