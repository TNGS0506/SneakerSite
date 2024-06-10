from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from mysite.models import Shoe, Category,User
from .serializers import ShoeSerializer, FeedbackSerializer,ShoeImageSerializer,CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



@api_view(['GET'])
@permission_classes([AllowAny])
def getData(request):
    shoes = Shoe.objects.all()
    serializer = ShoeSerializer(shoes, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def getShoesTop(request):
    shoes = Shoe.objects.all()
    serializer = ShoeSerializer(shoes, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([AllowAny])
def getShoesByCategory(request, category_name):
    category = Category.objects.get(id=category_name)
    queryset = Shoe.objects.filter(category=category)
    serializer = ShoeSerializer(queryset, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_feedback(request):
    if request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def getShoe(request, shoeId):
    shoe = Shoe.objects.get(id=shoeId)
    serializer = ShoeSerializer(shoe, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getCategories(request):
    data = Category.objects.all()
    serializer = CategorySerializer(data,many=True, context={"request" : request})
    return Response(serializer.data)


