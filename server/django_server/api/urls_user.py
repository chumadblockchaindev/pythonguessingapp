from django.urls import path
from .views_profile import (UserProfileView, LeaderboardView,
                            GameHistoryView, ProfileUpdateView, ChangePasswordView)

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('history/', GameHistoryView.as_view(), name='game-history'),
    path('profile/update/', ProfileUpdateView.as_view(), name='update-profile'),
    path('profile/change-password/',
         ChangePasswordView.as_view(), name='change-password'),
]
