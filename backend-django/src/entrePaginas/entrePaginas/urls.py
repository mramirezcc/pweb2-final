from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from bookstore.views import RegisterView, LoginView, LogoutView, SaleViewSet, UserIdView, UserViewSet, BookViewSet, EmailViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'books', BookViewSet)
router.register(r'sales', SaleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('register/', RegisterView.as_view({'post':'create'}), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    path('send-email/', EmailViewSet.as_view(), name='send-email'),  # Corrected
    path('get_user_id/', UserIdView.as_view(), name='get_user_id'),

    #path('register/', userRegisterView, name='register'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    