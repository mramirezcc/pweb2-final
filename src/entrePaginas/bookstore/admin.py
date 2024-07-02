from django.contrib import admin
from .models import User, ShoppingCart, Cathegory, Book, CartBook, Sale

admin.site.register(User)
admin.site.register(ShoppingCart)
admin.site.register(Cathegory)
admin.site.register(Book)
admin.site.register(CartBook)
admin.site.register(Sale)