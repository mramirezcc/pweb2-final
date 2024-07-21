from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    #username, email y password ya son proporcionados por AbstracUser
    address = models.CharField(max_length=100, default='No especificado', null=True, blank=True)
    number = models.IntegerField(default=0)
    portrait = models.ImageField(upload_to='portraits/', default='', blank=True, null=True)

    #Validación y verificación de datos
    #Aunque el formulario verificará los datos, esto se hace por mayor seguridad
    """def clean(self):
        super().clean()
        #Name no debe ser vacío
        if not self.name:
            raise ValidationError({'name':'Ingrese un nombre no vacío'})
        if not self.email:
            raise ValidationError({'email':'Ingrese un correo no vacío'})
        #Password no puede contener solo caracteres alfanuméricos
        if not any(char.isdigit() for char in self.password) or not any(char.isalpha() for char in self.password):
            raise ValidationError({'password':'Ingrese una contraseña con al menos un caracter especial'})
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    """

class ShoppingCart(models.Model):
    idUser = models.ForeignKey(User, on_delete = models.CASCADE, related_name='idUser_cart')
    total = models.IntegerField()
    #status = models.BooleanField(default = False)

class Book(models.Model):
    name = models.CharField(max_length=50)
    year = models.IntegerField()
    author = models.CharField(max_length=100)
    summary = models.TextField(default='')

    portrait = models.ImageField(upload_to='portraits/', default='', blank=True, null=True)
    #stock = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places = 2)
    CATHEGORY_CHOICES = {
        'N/A' : 'N/A',
        'Suspenso' : 'Suspenso',
        'Romance' : 'Romance',
        'CienciaFiccion' : 'Ciencia Ficción',
        'Aventura' : 'Aventura',
        'Fantasía' : 'Fantasía',
        'Acción' : 'Acción',
    }
    cathegory = models.CharField(
        max_length=20,
        choices = CATHEGORY_CHOICES,
        default= 'N/A'
    )
    #idEditorial = models.ForeignKey(Editorial, on_delete = models.CASCADE)

class CartBook(models.Model):
    idCart = models.ForeignKey(ShoppingCart, on_delete = models.CASCADE, related_name='idCart_cartbook')
    idBook = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='idBook_cartbook')

class Sale(models.Model):
    CREDIT_CARD = "Credit"
    DEBIT_CARD = "Debit"
    CASH = "Cash"
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

    def clean(self):
        super().clean()

        if self.total<=0:
            raise ValidationError({'total':'La venta no puede tener un valor negativo'})
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)