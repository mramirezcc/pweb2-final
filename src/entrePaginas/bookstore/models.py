from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=8)
    address = models.CharField(max_length=100)

class ShoppingCart(models.Model):
    idUser = models.ForeignKey(User, on_delete = models.CASCADE, related_name='idUser_cart')
    total = models.IntegerField()
    status = models.BooleanField(default = False)

class Cathegory(models.Model):
    name = models.CharField(max_length=20)

class Book(models.Model):
    name = models.CharField(max_length=50)
    year = models.IntegerField()
    author = models.CharField(max_length=100)
    #stock = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places = 2)
    idCathegory = models.ForeignKey(Cathegory, on_delete=models.CASCADE, related_name='cathegory_book')
    #idEditorial = models.ForeignKey(Editorial, on_delete = models.CASCADE)

class CartBook(models.Model):
    idCart = models.ForeignKey(ShoppingCart, on_delete = models.CASCADE, related_name='idCart_cartbook')
    idBook = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='idBook_cartbook')

class Sale(models.Model):
    CREDIT_CARD = "CC"
    DEBIT_CARD = "DC"
    CASH = "$"
    PAY_METHOD_CHOICES = {
        CREDIT_CARD: 'Credit card',
        DEBIT_CARD: 'Debit card',
        CASH: 'Cash',
    }
    payMethod = models.CharField(
        max_length=20,
        choices =  PAY_METHOD_CHOICES,
        default = CREDIT_CARD,
    )
    idCart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE, related_name='idCart_sale')
    total = models.IntegerField()
    date = models.DateField(auto_now=True)