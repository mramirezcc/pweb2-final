from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bookstore.views import AddBookToUserAPIView, CreateBookView, DecrementBookStockAPIView, DeleteMessageView, ShoppingCartViewSet, UserBooksView, RegisterView, LoginView, LogoutView, SaleViewSet, UserIdView, UserViewSet, BookViewSet, EmailViewSet, UserBooksAPIView, ShowMessagesView, SendMessageView, generate_pdf
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'books', BookViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'shopping-carts', ShoppingCartViewSet, basename='shopping-cart')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('register/', RegisterView.as_view({'post':'create'}), name='register'),
    path('login/', LoginView.as_view(), name='login'),  
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user-books/', UserBooksView.as_view(), name='user-books'),
    
    path('send-email/', EmailViewSet.as_view(), name='send-email'),
    path('get_user_id/', UserIdView.as_view(), name='get_user_id'),
    path('users/<int:idUser>/books/', UserBooksAPIView.as_view(), name='user_books_api'),
    path('users/<int:idUser>/books/add/', AddBookToUserAPIView.as_view(), name='add_book_to_user_api'),

    # Rutas para agregar y eliminar libros del carrito de compras
    path('shopping-carts/<int:pk>/add-book/', ShoppingCartViewSet.as_view({'post': 'add_book'}), name='add-book'),
    path('shopping-carts/<int:pk>/remove-book/', ShoppingCartViewSet.as_view({'post': 'remove_book'}), name='remove-book'),
    path('shopping-carts/<int:pk>/', ShoppingCartViewSet.as_view({'get': 'retrieve'}), name='shopping-cart-detail'),


    path('messages/', ShowMessagesView.as_view(), name='messages-api'),
    path('send-message/', SendMessageView.as_view(), name='send-message'),
    path('messages/delete/<int:message_id>/', DeleteMessageView.as_view(), name='delete-message'),

    path('create-book/', CreateBookView.as_view(), name='create-book'),

    path('generate-pdf/<int:user_id>/', generate_pdf, name='generate_pdf'),
    path('books/<int:bookId>/decrement-stock/', DecrementBookStockAPIView.as_view(), name='decrement_book_stock_api'),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
