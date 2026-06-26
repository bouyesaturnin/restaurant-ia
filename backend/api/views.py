from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .agent import chat
from .models import Reservation, TakeawayOrder


@api_view(['POST'])
def chat_view(request):
    messages = request.data.get('messages', [])
    if not messages:
        return Response({'error': 'messages requis'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        reply_text, action = chat(messages)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Exécute l'action si l'agent a collecté toutes les infos
    if action:
        if action.get('action') == 'save_reservation':
            Reservation.objects.create(
                name=action.get('name', ''),
                date=action.get('date', ''),
                time=action.get('time', ''),
                guests=int(action.get('guests', 1)),
            )
        elif action.get('action') == 'save_order':
            TakeawayOrder.objects.create(
                items=action.get('items', ''),
                pickup_time=action.get('pickup_time', ''),
            )

    return Response({'reply': reply_text})


@api_view(['GET'])
def reservations_view(request):
    data = list(Reservation.objects.order_by('-created_at').values(
        'id', 'name', 'date', 'time', 'guests', 'created_at'
    ))
    return Response(data)


@api_view(['GET'])
def orders_view(request):
    data = list(TakeawayOrder.objects.order_by('-created_at').values(
        'id', 'items', 'pickup_time', 'created_at'
    ))
    return Response(data)
