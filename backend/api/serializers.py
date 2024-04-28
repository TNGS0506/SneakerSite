from rest_framework import serializers
from mysite.models import Shoe, Category



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        
    
class ItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    
    class Meta:
        model = Shoe
        fields = ['id', 'name', 'image', 'price', 'description', 'created_date', 'category']
        