from django.contrib import admin
from .models import User, ShoppingCart, Book, CartBook, Sale

admin.site.register(User)
admin.site.register(ShoppingCart)
admin.site.register(Book)
admin.site.register(CartBook)
admin.site.register(Sale)