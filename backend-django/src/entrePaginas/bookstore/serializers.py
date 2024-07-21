from rest_framework import serializers
from .models import User, ShoppingCart, Book, Sale
from django.contrib.auth import authenticate

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['name', 'year', 'author', 'portrait', 'price', 'cathegory', 'summary']

class UserSerializer(serializers.ModelSerializer):
    #password = serializers.CharField(write_only=True, min_length=8)
    #password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'address', 'number', 'portrait']

    def validate(self, data):
        #if data['password'] != data['password2']:
            #raise serializers.ValidationError("Las contraseñas no coinciden")
        if not any(char.isdigit() for char in data['password']) or not any(char.isalpha() for char in data['password']):
            raise serializers.ValidationError("Ingrese una contraseña con al menos un número y una letra")
        return data

    def create(self, validated_data):
        user = User.objects.create(
            name=validated_data['name'],
            email=validated_data['email'],
            password=validated_data['password'],
            address=validated_data['address'],
            number=validated_data['number'],
            portrait=validated_data['portrait'],
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError("Credenciales incorrectas")
    
