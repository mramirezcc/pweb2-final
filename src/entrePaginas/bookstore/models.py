from django.db import models

class User(models.Model):
    name = models.CharField()
    email = models.EmailField()
    password = models.CharField()
    address = models.CharField()

class ShoppingCart(models.Model):
    total = models.IntegerField()

class CartBook(models.Model):
    idCart = models.ForeignKey(ShoppingCart, on_delete = models.CASCADE)

class Book(models.Model):
    name = models.CharField()

class Cathegory(models.Model):
    name = models.CharField()

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