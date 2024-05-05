from rest_framework.response import Response
from rest_framework.decorators import api_view
from mysite.models import Shoe,Category
from .serializers import ItemSerializer


@api_view(['GET'])
def getData(request):
    shoes = Shoe.objects.all()
    serializer = ItemSerializer(shoes, many = True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
def getShoesByCategory(request, category_name):
    category = Category.objects.get(name=category_name)
    queryset = Shoe.objects.filter(category = category)
    
    serializer = ItemSerializer(queryset, many=True, context={'request': request})
    
    return Response(serializer.data)

