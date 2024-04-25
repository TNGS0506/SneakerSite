from django.contrib import admin
from .models import Shoe, Category, Size



class SizeInline(admin.TabularInline):
    model = Size
    extra = 1

@admin.register(Shoe)

class ShoeAdmin(admin.ModelAdmin):
    inlines = [SizeInline]
    

admin.site.register(Category)