from rest_framework import serializers
from .models import Definition, Usage

class DefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Definition
        fields = ['id', 'book_position', 'figure_name', 'content', 'custom_rules']
        
class UsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usage
        fields = ['id', 'book_position', 'figure_name', 'content', 'custom_rules']