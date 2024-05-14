from django.contrib import admin
from .models import Shoe, Category, Size, Feedback, ShoeImage

class SizeInline(admin.TabularInline):
    model = Size
    extra = 1

class ShoeImageInline(admin.TabularInline):
    model = ShoeImage
    extra = 1

@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    inlines = [SizeInline, ShoeImageInline]
    list_display = ('name', 'price', 'category', 'created_date')
    search_fields = ('name', 'category__name')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('sender', 'text', 'created_date')

admin.site.register(Category)
