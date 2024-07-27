from django.contrib import admin
from .models import User, ShoppingCart, Book, Sale, Message

admin.site.register(User)
admin.site.register(ShoppingCart)
admin.site.register(Book)
admin.site.register(Sale)
admin.site.register(Message)
