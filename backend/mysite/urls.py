from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData , name="GetData"),
    path('<str:category_name>/', views.getShoesByCategory, name='getShoesByCategory')
]