from datetime import datetime
from django import template
from django.conf import settings
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import BookWithSaleDateSerializer, SaleSerializer, UserSerializer, LoginSerializer, BookSerializer, MessageSerializer, ShoppingCartSerializer
from .models import User, ShoppingCart, Sale, Book, Message
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .forms import EmailForm
from rest_framework.views import APIView

from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from django.contrib import messages


from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (AllowAny,)
    #para crear un carrito de compras!

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create a shopping cart for the new user
        ShoppingCart.objects.create(idUser=user)
        print("Creando carrito!")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

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
    

class CreateBookView(generics.CreateAPIView):
    serializer_class = BookSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
        
class DeleteMessageView(APIView):
    def delete(self, request, message_id):
        try:
            message = Message.objects.get(id=message_id)
        except Message.DoesNotExist:
            return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)

        message.delete()
        return Response({"status": "Message deleted"}, status=status.HTTP_200_OK)

class SendMessageView(APIView):
    def post(self, request):
        sender_id = request.data.get('sender_id')
        
        if not sender_id:
            return Response({"error": "sender_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            sender = User.objects.get(id=sender_id)
        except User.DoesNotExist:
            return Response({"error": "Sender not found"}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy()
        data['sender'] = sender.id
        
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShowMessagesView(APIView):
    def get(self, request):
        mensajes = Message.objects.all()
        serializer = MessageSerializer(mensajes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserBooksAPIView(APIView):
    def get(self, request, idUser):
        sales = Sale.objects.filter(idUser=idUser).select_related('idBook')
        books_with_date = []
        
        for sale in sales:
            book = sale.idBook
            book_data = {
                'id': book.id,
                'name': book.name,
                'year': book.year,
                'author': book.author,
                'portrait': book.portrait,
                'price': book.price,
                'cathegory': book.cathegory,
                'summary': book.summary,
                'date': sale.date
            }
            books_with_date.append(book_data)
        
        serializer = BookWithSaleDateSerializer(books_with_date, many=True)
        return Response(serializer.data)
    

class ShoppingCartViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        cart = get_object_or_404(ShoppingCart, idUser=pk)
        books = cart.idBooks.all()  
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def create(self, request):
        user_id = request.data.get('user')
        user = User.objects.get(id=user_id)
        cart = ShoppingCart.objects.create(idUser=user)
        return Response({'id': cart.id}, status=status.HTTP_201_CREATED)

    def add_book(self, request, pk=None):
        cart = get_object_or_404(ShoppingCart, idUser=pk)
        book_id = request.data.get('book_id')
        book = get_object_or_404(Book, id=book_id)
        cart.add_book(book)
        return Response({'status': 'Book added'}, status=status.HTTP_200_OK)

    def remove_book(self, request, pk=None):
        cart = get_object_or_404(ShoppingCart, idUser=pk)
        book_id = request.data.get('book_id')
        book = get_object_or_404(Book, id=book_id)
        cart.idBooks.remove(book)
        return Response({'status': 'Book removed'}, status=status.HTTP_200_OK)
    
@csrf_exempt
def generate_pdf(request, user_id):
    try:
        user = get_object_or_404(User, id=user_id)
        data = json.loads(request.body)
        librosParaComprar = data.get('books', [])
        
        if not librosParaComprar:
            return JsonResponse({'error': 'No books provided'}, status=400)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="boleta_venta.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []

        styles = getSampleStyleSheet()
        title_style = styles['Heading1']
        normal_style = styles['Normal']
        date_style = ParagraphStyle('date', fontSize=10, spaceAfter=10)
        bold_style = ParagraphStyle('bold', fontSize=12, textColor=colors.black, spaceAfter=12)
        thanks_style = ParagraphStyle('thanks', fontSize=18, textColor=colors.green, spaceAfter=20)

        elements.append(Paragraph("Boleta de Venta - EntrePáginas", title_style))
        elements.append(Spacer(1, 12))

        elements.append(Paragraph(f"Usuario: {user.username}", bold_style))
        elements.append(Paragraph(f"Fecha: {datetime.now().strftime('%d/%m/%Y')}", date_style))
        elements.append(Paragraph(f"Dirección: {user.address}", normal_style))
        elements.append(Paragraph(f"Correo: {user.email}", normal_style))
        elements.append(Spacer(1, 12))

        data = [["Cantidad", "Descripción", "Total"]]
        for libro in librosParaComprar:
            price = float(libro['price'])
            amount = float(libro['amount'])
            total = price * amount
            descripcion = f"{libro['name']} por {libro['author']}"
            data.append([amount, descripcion, f"{total:.2f}"])

        table = Table(data, colWidths=[50, 300, 100])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BOX', (0, 0), (-1, -1), 2, colors.black),
        ]))
        elements.append(table)

        subtotal = sum(float(libro['price']) * float(libro['amount']) for libro in librosParaComprar)
        igv = subtotal * 0.18
        total = subtotal + igv

        elements.append(Spacer(1, 12))
        elements.append(Paragraph(f"Subtotal: {subtotal:.2f}", normal_style))
        elements.append(Paragraph(f"IGV (18%): {igv:.2f}", normal_style))
        elements.append(Paragraph(f"Total: {total:.2f}", normal_style))
        elements.append(Spacer(1, 12))

        elements.append(Paragraph("Gracias por su compra", thanks_style))

        doc.build(elements)
        return response

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)