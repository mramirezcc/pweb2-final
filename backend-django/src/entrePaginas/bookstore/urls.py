from .views import send_emails
from django.urls import path, include
from .views import (
    RegistroUsuarioView, 
    IniciarSesionView, 
    ObtenerUsuarioView, 
    CrearChambaView,
    ObtenerChambasDeEmpleadorView,
    EliminarChambaView,
    ListarTrabajadoresView,
    EnviarMensajeView,
    ListarMensajesView
)

urlpatterns = [
    path('send-email/', send_emails, name='send-email'),  # Endpoint for sending emails

    # Static and media file serving in development
]
