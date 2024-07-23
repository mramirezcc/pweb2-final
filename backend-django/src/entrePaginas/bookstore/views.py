from django import template
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import SaleSerializer, UserSerializer, LoginSerializer, BookSerializer, MessageSerializer
from .models import User, ShoppingCart, Sale, CartBook, Book, Message
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .forms import EmailForm
from rest_framework.views import APIView

from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from django.contrib import messages




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (AllowAny,)

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

        user = serializer.validated_data['user']
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
    
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('idUser')
        if user_id:
            queryset = queryset.filter(idUser=user_id)
        return queryset

class UserBooksView(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('userId')
        print("Id del usuario:", user_id)
        if user_id:
            # Obtener los ids de los libros de las ventas del usuario
            sale_books = Sale.objects.filter(idUser=user_id).values_list('idBook', flat=True)
            # Obtener los libros correspondientes
            return Book.objects.filter(id__in=sale_books)
        return Book.objects.none()


@method_decorator(csrf_exempt, name='dispatch')
class EmailViewSet(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            selected_clients = data.get('selectedClients', [])
            subject = data.get('subject', '')
            message = data.get('message', '')

            if not subject or not message:
                return JsonResponse({'error': 'Subject and message are required'}, status=400)

            for client in selected_clients:
                username = client.get('username')
                email = client.get('email')

                if not username or not email:
                    continue

                email_body = f"Dear {username},\n\n{message}"

                email_message = EmailMessage(
                    subject,
                    email_body,
                    settings.EMAIL_HOST_USER,
                    [email]
                )

                email_message.fail_silently = False
                email_message.send()

            return JsonResponse({'success': 'Emails sent successfully'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

class UserIdView(View):
    def get(self, request):
        email = request.GET.get('email')
        try:
            user = User.objects.get(email=email)
            return JsonResponse({'user_id': user.id})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)
        


class SendMessageView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShowMessagesView(APIView):
    def get(self, request, usuario_id):
        try:
            usuario = User.objects.get(id=usuario_id)
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        mensajes_recibidos = Message.objects.filter(destinatario=usuario)
        serializer_recibidos = MessageSerializer(mensajes_recibidos, many=True)
        
        return Response({
            "mensajes_recibidos": serializer_recibidos.data
        }, status=status.HTTP_200_OK)