from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from mysite.models import Shoe, Category
from .serializers import ShoeSerializer, FeedbackSerializer,ShoeImageSerializer


@api_view(['GET'])
def getData(request):
    shoes = Shoe.objects.all()
    serializer = ShoeSerializer(shoes, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
def getShoesTop(request):
    shoes = Shoe.objects.all()
    serializer = ShoeSerializer(shoes, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
def getShoesByCategory(request, category_name):
    category = Category.objects.get(id=category_name)
    queryset = Shoe.objects.filter(category=category)
    serializer = ShoeSerializer(queryset, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
def submit_feedback(request):
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getShoe(request, shoeId):
    shoe = Shoe.objects.get(id=shoeId)
    serializer = ShoeSerializer(shoe, context={'request': request})
    return Response(serializer.data)
