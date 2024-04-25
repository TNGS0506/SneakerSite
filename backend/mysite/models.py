from django.db import models
from django.contrib.auth.models import AbstractUser
import os

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name

class Shoe(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="brand_images/", null=True, blank=True)
    price = models.IntegerField(max_length=20)  
    description = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    def delete(self, *args, **kwargs):
        # Delete the associated image file before deleting the object
        if self.image:
            # Get the path to the image file
            image_path = self.image.path
            # Delete the file from storage
            if os.path.exists(image_path):
                os.remove(image_path)
        super().delete(*args, **kwargs)
        
        
        

class Size(models.Model):
    shoe = models.ForeignKey('Shoe', on_delete=models.CASCADE)
    size = models.CharField(max_length=10)

    def __str__(self):
        return self.size
    
class User(AbstractUser):
    phone_number = models.CharField(max_length=20)
    email_address = models.EmailField(max_length=254)
    image = models.ImageField(upload_to="user_images/", null=True, blank=True)
    
    # Define groups and permissions directly in the User class
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='custom_user_set',
        related_query_name='custom_user',
    )
    
    # Provide a custom related_name for user_permissions to avoid clashes
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='custom_user_permissions',
        related_query_name='custom_user_permission',
    )
