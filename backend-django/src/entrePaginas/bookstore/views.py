from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer
from .models import User, ShoppingCart, Sale, CartBook, Book

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        }, status=status.HTTP_200_OK)
    
class LogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

@method_decorator(login_required, name='dispatch')
class PurchaseView(View):
    def post(self, request):
        user = request.user
        cart = ShoppingCart.objects.filter(idUser=user, status=False).first()
        if not cart:
            return render(request, 'error.html', {'message': 'No hay carritos de compra'})

        total = sum(item.idBook.price for item in CartBook.objects.filter(idCart=cart))

        sale = Sale.objects.create(
            payMethod=request.POST.get('payMethod', Sale.CREDIT_CARD),
            idCart=cart,
            total=total
        )

        cart.status = True
        cart.total = total
        cart.save()

        return render(request, 'purchase_success.html', {'sale': sale})