from django.shortcuts import render, redirect
from .forms import RegisterForm, LoginForm
from django.contrib.auth import login, authenticate
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User

"""def userRegisterView(request):
    myForm = RegisterForm(request.POST or None)
    if myForm.is_valid():
        myForm.save()
        myForm = RegisterForm

    context = {
        'form': myForm
    }
    return render(request, 'bookstore/test.html', context)

def loginView(request):
    if request.method == 'POST':
        myForm = LoginForm(data=request.POST)
        if myForm.is_valid():
            user = authenticate(request, name=myForm.cleaned_data.get('name'), password=myForm.cleaned_data.get('password'))
            login(request, user)
            return redirect('homepage')
    else:
        myForm = LoginForm()

    context = {
        'form': myForm
    }
    return render(request, 'bookstore/login.html', context)"""

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer