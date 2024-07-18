from django.shortcuts import render
from bookstore.models import User
from .forms import RegisterForm

def userRegisterView(request):
    myForm = RegisterForm(request.POST or None)
    if myForm.is_valid():
        myForm.save()
        myForm = RegisterForm

    context = {
        'form': myForm
    }
    return render(request, 'bookstore/test.html', context)