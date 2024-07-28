from rest_framework import serializers
from .models import User, ShoppingCart, Book, Sale, Message
from django.contrib.auth import authenticate

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'name', 'year', 'author', 'portrait', 'price', 'cathegory', 'summary', 'stock']

class UserSerializer(serializers.ModelSerializer):
    #password = serializers.CharField(write_only=True, min_length=8)
    #password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'address', 'number', 'portrait']

    """"    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre ya está registrado.")
        return value

    def validate_password(self, data):
        #if data['password'] != data['password2']:
            #raise serializers.ValidationError("Las contraseñas no coinciden")
        if not any(char.isdigit() for char in data['password']) or not any(char.isalpha() for char in data['password']):
            raise serializers.ValidationError("Ingrese una contraseña con al menos un número y una letra")
        return data

    """
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            address=validated_data['address'],
            number=validated_data['number'],
            portrait=validated_data['portrait'],
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        print(username, password)
        if not username or not password:
            raise serializers.ValidationError("Debe incluir tanto el nombre de usuario como la contraseña.")

        print()
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Credenciales incorrectas.")

        data['user'] = user
        return data


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['id', 'payMethod', 'idUser', 'idBook', 'total', 'date']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id','sender', 'message', 'date']
        read_only_fields = ['date']



class BookWithSaleDateSerializer(serializers.ModelSerializer):
    date = serializers.DateField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'year', 'author', 'portrait', 'price', 'cathegory', 'summary', 'date']


class ShoppingCartSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = ShoppingCart
        fields = ['id', 'user', 'books', 'date']

