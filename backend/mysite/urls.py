from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.getData , name="GetData"),
    path('shoes/', views.getShoesTop, name="getShoesTop"),   
    path('<str:category_name>/', views.getShoesByCategory, name='getShoesByCategory'),
    
]