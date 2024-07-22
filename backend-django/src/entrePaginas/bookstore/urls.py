from .views import send_emails
from django.urls import path, include


urlpatterns = [
    path('send-email/', send_emails, name='send-email'),  # Endpoint for sending emails

    # Static and media file serving in development
]
