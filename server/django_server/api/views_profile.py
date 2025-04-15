from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import update_session_auth_hash
from .models import Game, UserProfile, UserDetail
from .serializers import (GameHistorySerializer, UserProfileSerializer,
                          ProfileUpdateSerializer, PasswordChangeSerializer)


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)


# class UserDetailView(APIView):
#     serializer_class = ProfileUpdateSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         user = UserDetail.objects.filter(user=request.user)
#         return Response(user, status=200)


class LeaderboardView(generics.ListAPIView):
    queryset = UserProfile.objects.select_related(
        'user').order_by('best_score')
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]


class GameHistoryView(generics.ListAPIView):
    serializer_class = GameHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Game.objects.filter(user=self.request.user).order_by('created_at')


class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()
            update_session_auth_hash(request, user)
            return Response({'message': 'Password updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
