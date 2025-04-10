from django.urls import path, include
from api.views import GameLevelListView, StartGameView, SubmitGuessView, NotificationListView
from api.views_auth import CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView
from django.contrib import admin
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('levels/', GameLevelListView.as_view(), name='levels'),
    path('start/', StartGameView.as_view(), name='start-game'),
    path('guess/<int:game_id>/', SubmitGuessView.as_view(), name='guess'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('api/admin/', include('api.urls_admin')),
    path('api/user/', include('api.urls_user')),
]

urlpatterns += router.urls
