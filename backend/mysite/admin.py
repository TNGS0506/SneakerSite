from django.contrib import admin
from .models import Shoe, Category, Size, Feedback



class SizeInline(admin.TabularInline):
    model = Size
    extra = 1

@admin.register(Shoe)

class ShoeAdmin(admin.ModelAdmin):
    inlines = [SizeInline]
    

admin.site.register(Category)
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('sender', 'text', 'created_date')