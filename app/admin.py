from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display=['user','name','gender','locality','city','state']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'brand', 'category', 'discounted_price', 'selling_price']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display=['id','user','product_title','quantity','total_price']

    def product_title(self,obj):
        return obj.product.title
    
    def total_price(self,obj):
        price=obj.product.discounted_price
        quantity=obj.quantity
        return price*quantity

@admin.register(OrderPlaced)
class OrderPlacedAdmin(admin.ModelAdmin):
    list_display=['id', 'user', 'customer_name', 'product_title', 'quantity', 'address','ordered_date', 'status']

    def customer_name(self,obj):
        return obj.customer.name
    customer_name.short_description="Customer"
    
    def product_title(self,obj):
        return obj.product.title
    product_title.short_description='Product'

    def address(self,obj):
        return obj.customer.locality+' '+obj.customer.city
