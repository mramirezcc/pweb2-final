from django.shortcuts import render, redirect
from .forms import RegisterForm, LoginForm
from django.contrib.auth import login, authenticate

def userRegisterView(request):
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
    return render(request, 'bookstore/login.html', context)