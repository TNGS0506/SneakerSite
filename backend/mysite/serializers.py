from rest_framework import serializers
from mysite.models import Shoe, Category, Feedback


class ShoeSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Shoe
        fields = ['id', 'name', 'image', 'price', 'description', 'created_date', 'category']

    def get_image(self, obj):
        # Get the absolute URL for the image field
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        
    
class ItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Shoe
        fields = ['id', 'name', 'image', 'price', 'description', 'created_date', 'category']

    def get_image(self, obj):
        # Get the absolute URL for the image field
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
    
    
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['sender', 'text', 'created_date']