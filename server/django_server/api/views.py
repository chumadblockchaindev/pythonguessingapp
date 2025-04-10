from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import GameLevel, GameSession, Notification
from .serializers import GameLevelSerializer, GameSessionSerializer, NotificationSerializer
from django.shortcuts import get_object_or_404
import random


class GameLevelListView(generics.ListAPIView):
    queryset = GameLevel.objects.all()
    serializer_class = GameLevelSerializer
    permission_classes = [permissions.IsAuthenticated]


class StartGameView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        level_id = request.data.get('level_id')
        level = get_object_or_404(GameLevel, id=level_id)
        number = random.randint(level.min_value, level.max_value)
        game = GameSession.objects.create(
            user=request.user,
            level=level,
            number_to_guess=number
        )
        return Response({'game_id': game.id}, status=status.HTTP_201_CREATED)


class SubmitGuessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, game_id):
        guess = int(request.data.get('guess'))
        game = get_object_or_404(
            GameSession, id=game_id, user=request.user, is_active=True)

        game.attempts += 1
        game.save()

        if guess == game.number_to_guess:
            game.is_active = False
            game.is_won = True
            game.save()
            return Response({'message': 'Correct!', 'attempts': game.attempts})
        elif guess < game.number_to_guess:
            return Response({'message': 'Too low'})
        else:
            return Response({'message': 'Too high'})


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(is_global=True) | Notification.objects.filter(user=self.request.user)
