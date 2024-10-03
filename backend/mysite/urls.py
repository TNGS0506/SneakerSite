from django.urls import path
from .views import CustomGraphQLView
from django.views.decorators.csrf import csrf_exempt
from . import views
from .schema import schema

urlpatterns = [
    path('all/', views.getData , name="GetData"),
    path('allshoes/', views.getShoesTop, name="getShoesTop"),   
    path('submit-feedback/', views.submit_feedback, name='submit_feedback'),
    path('shoes/<str:shoeId>/',views.getShoe, name='getShoe'),
    path('categories/<str:category_name>/', views.getShoesByCategory, name='getShoesByCategory'),
    path('categories/', views.getCategories, name="Get All categories"),
    path('user/EditProfile/', views.update_profile, name='update_profile'),
    path("graphql/", csrf_exempt(CustomGraphQLView.as_view(graphiql=True, schema=schema))),
]