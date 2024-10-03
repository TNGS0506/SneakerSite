import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from mysite.models import Category, Shoe, Size, Feedback, ShoeImage
import graphql_jwt

from graphene_django.views import GraphQLView

class CustomGraphQLView(GraphQLView):
    def get_context(self, request):
        print("Request:", request) 
        return super().get_context(request)

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = "__all__"
        
        
class ShoeImageType(DjangoObjectType):
    class Meta:
        model = ShoeImage
        
class ShoeSizeType(DjangoObjectType):
    class Meta:
        model = Size
        

class ShoeType(DjangoObjectType):
    images = graphene.List(ShoeImageType)
    sizes = graphene.List(ShoeSizeType)
    
    class Meta:
        model = Shoe
        fields = "__all__"
        
    def resolve_images(self, info):
        return self.images.all()
    
    def resolve_sizes(self, info):
        return self.sizes.all();
        

class FeedbackType(DjangoObjectType):
    class Meta:
        model = Feedback
        fields = ['sender', 'phone_number', 'text', 'created_date']
        
class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ('password',)  
        
class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)
    all_shoes = graphene.List(ShoeType)
    shoe_by_id = graphene.Field(ShoeType, id=graphene.Int(required = True))
    shoes_by_category = graphene.List(ShoeType, category = graphene.String(required = True))
    top_shoes = graphene.List(ShoeType, category = graphene.Int(required = True))
    
    app_users = graphene.List(UserType)
    viewer = graphene.Field(UserType)

    
    
    
    def resolve_app_users(self, info):
        return get_user_model().objects.all()
    
    def resolve_all_categories(root, info):
        return Category.objects.all()
    
    def resolve_all_shoes(root, info):
        return Shoe.objects.all()

    def resolve_shoe_by_id(root, info, id):
        return Shoe.objects.get(pk = id)
    
    def resolve_shoes_by_category(root, info, category):
        return Shoe.objects.filter(category__name = category)
    
    def resolve_top_shoes(root, info, category):
        return Shoe.objects.filter(category__id = category).order_by('-created_date')[:4]
    
    
    def resolve_viewer(self, info, **kwargs):
        print("Context:", info.context)
        user = info.context.user
        if not user.is_authenticated: 
            raise Exception("Authentication credentials were not provided")
        return user 

class UpdateUserProfile(graphene.Mutation):
    class Arguments:
        username = graphene.String(required = False)
        email = graphene.String(required = False)
        phone_number = graphene.String(required = False)

    user = graphene.Field(UserType)
    
    def mutate(self,info, username = None, email = None, phone_number = None):
        user = info.context.user
        
        if not user.is_authenticated:
            raise Exception("You must be logged in to update your profile.0")
        
        if username: 
            user.username = username
        if email: 
            user.email = email
        if phone_number:
            user.phone_number = phone_number
            
        user.save()
        return UpdateUserProfile(user = user)

class create_feedback(graphene.Mutation):
    class Arguments:
        sender = graphene.String(required = True)
        phone_number = graphene.String(required = True)
        text = graphene.String(required = True)
    
    feedback = graphene.Field(FeedbackType)    
    
    @classmethod
    def mutate (cls, root, info, sender, phone_number, text):
        feedback = Feedback(
            sender = sender,
            phone_number = phone_number,
            text = text
        )
        feedback.save()
        return create_feedback(feedback = feedback)
            

class CreateAppUser(graphene.Mutation):
    app_user = graphene.Field(UserType)
    
    class Arguments:
        username = graphene.String(required = True)
        password= graphene.String(required = True)

    def mutate(self, info, username, password):
        app_user = get_user_model()
        new_user = app_user.objects.create_user(username = username, password=password)
        return CreateAppUser(app_user = new_user)
    
class Mutation(graphene.ObjectType):
    create_feedback = create_feedback.Field()
    create_app_user = CreateAppUser.Field()
    update_user_profile = UpdateUserProfile.Field()
    
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation = Mutation)