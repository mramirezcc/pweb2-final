from rest_framework import serializers
from .models import User, Book

class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password1', 'password2', 'address']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        if not any(char.isdigit() for char in data['password1']) or not any(char.isalpha() for char in data['password1']):
            raise serializers.ValidationError("Ingrese una contraseña con al menos un número y una letra")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User(**validated_data)
        user.set_password(validated_data['password1'])
        user.save()
        return user