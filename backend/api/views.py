from rest_framework.response import Response
from rest_framework.decorators import api_view
from mysite.models import Shoe
from .serializers import ItemSerializer


@api_view(['GET'])
def getData(request):
    shoes = Shoe.objects.all()
    serializer = ItemSerializer(shoes, many = True)
    return Response(serializer.data)