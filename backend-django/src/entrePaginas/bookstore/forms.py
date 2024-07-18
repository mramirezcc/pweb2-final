from django import forms
from .models import User
from django.core.validators import MinLengthValidator

class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, validators=[MinLengthValidator(8, message='La contraseña debe tener al menos 8 caracteres')])
    password2 = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = [
            'name', 'email', 'password', 'address'
        ]
    
    def clean(self):
        cleaned_data = super().clean()
        #name y email no requieren mayor verificación
        password = cleaned_data.get('password')
        password2 = cleaned_data.get('password2')


        if password != password2:
            raise forms.ValidationError('Las contraseñas no coinciden')
        if not any(char.isdigit() for char in self.password) or not any(char.isalpha() for char in self.password):
            raise forms.ValidationError({'password':'Ingrese una contraseña con al menos un caracter especial'})
        
        return cleaned_data
    
    def save(self, commit=True):
        user = super().save(commit=True)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user