from django.db import models

class User(models.Model):
    name = models.CharField()
    email = models.EmailField()
    password = models.CharField()
    address = models.CharField()

class ShoppingCart(models.Model):
    idUser = models.ForeignKey(User, on_delete = models.CASCADE)
    total = models.IntegerField()
    status = models.BooleanField(default = False)

class Cathegory(models.Model):
    name = models.CharField()

class Book(models.Model):
    name = models.CharField()
    year = models.IntegerField(max_length = 4)
    author = models.CharField()
    #stock = models.IntegerField()
    price = models.DecimalField(decimal_places = 2)
    idCathegory = models.ForeignKey(Cathegory, on_delete=models.CASCADE)
    #idEditorial = models.ForeignKey(Editorial, on_delete = models.CASCADE)

class CartBook(models.Model):
    idCart = models.ForeignKey(ShoppingCart, on_delete = models.CASCADE)
    idBook = models.ForeignKey(Book, on_delete=models.CASCADE)

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
        choices =  PAY_METHOD_CHOICES,
        default = CREDIT_CARD,
    )
    idCart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    total = models.ForeignKey(ShoppingCart, to_field='total', on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)