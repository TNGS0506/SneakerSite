from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from mysite.views import CreateUserView, UserProfileView,UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from mysite.schema import schema

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mysite.urls')),
    path('api/user/register/', UserRegistrationView.as_view(), name='register'),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema = schema))),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
