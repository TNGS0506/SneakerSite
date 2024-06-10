from rest_framework import serializers
from mysite.models import Shoe, Category, Feedback, ShoeImage, Size, User


class ShoeImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ShoeImage
        fields = ['id', 'image']

    def get_image(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'size']

class ShoeSerializer(serializers.ModelSerializer):
    images = ShoeImageSerializer(many=True, read_only=True)
    sizes = SizeSerializer(many=True, read_only=True)
    image_files = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True,
        required=False
    )

    class Meta:
        model = Shoe
        fields = ['id', 'name', 'image', 'images', 'price', 'sizes', 'description', 'created_date', 'category', 'image_files']

    def get_image(self, obj):
        first_image = obj.images.first()
        if first_image and first_image.image:
            return self.context['request'].build_absolute_uri(first_image.image.url)
        return None

    def create(self, validated_data):
        image_files = validated_data.pop('image_files', [])
        shoe = Shoe.objects.create(**validated_data)

        # Check if the regular 'image' field is provided
        if 'image' in validated_data:
            image_files.append(validated_data['image'])

        for image_file in image_files:
            ShoeImage.objects.create(shoe=shoe, image=image_file)

        return shoe

    def update(self, instance, validated_data):
        image_files = validated_data.pop('image_files', [])
        instance = super().update(instance, validated_data)

        # Check if the regular 'image' field is provided
        if 'image' in validated_data:
            image_files.append(validated_data['image'])

        for image_file in image_files:
            ShoeImage.objects.create(shoe=instance, image=image_file)

        return instance

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
        fields = ['sender', 'phone_number', 'text', 'created_date']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'phone_number', 'email_address', 'image', 'groups', 'user_permissions']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
    
