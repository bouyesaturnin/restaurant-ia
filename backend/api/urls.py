from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.chat_view),
    path('reservations/', views.reservations_view),
    path('orders/', views.orders_view),
]
