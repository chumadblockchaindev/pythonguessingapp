from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import GameLevel, UserDetail, UserProfile, Notification
from .serializers import (GameLevelSerializer, AdminUserSerializer,
                          UserProfileStatsSerializer, NotificationSerializer)
from .permissions import IsAdminUserOnly
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password

User = get_user_model()


class GameLevelViewSet(viewsets.ModelViewSet):
    queryset = GameLevel.objects.all()
    serializer_class = GameLevelSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUserOnly]


class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = UserDetail.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUserOnly]

    @action(detail=True, methods=['post'])
    def suspend(self, request, pk=None):
        user = self.get_object()
        user.is_suspended = True
        user.save()
        return Response({'message': 'User suspended successfully'})

    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        user = self.get_object()
        user.is_suspended = False
        user.is_active = True
        user.save()
        return Response({'message': 'User activated successfully'})


class UserStatsView(generics.ListAPIView):
    queryset = UserProfile.objects.select_related('user').all()
    serializer_class = UserProfileStatsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUserOnly]


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUserOnly]


class AdminUpdateProfileView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def put(self, request):
        admin = request.user
        data = request.data
        username = data.get("username")
        password = data.get("password")

        if username:
            admin.username = username
        if password:
            admin.password = make_password(password)

        admin.save()
        return Response({"message": "Admin profile updated successfully"}, status=status.HTTP_200_OK)
