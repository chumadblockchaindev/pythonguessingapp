from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views_admin import GameLevelViewSet, AdminUserViewSet, NotificationViewSet, UserStatsView

router = DefaultRouter()

router.register(r'levels', GameLevelViewSet, basename='level')
router.register(r'users', AdminUserViewSet, basename='admin-users')
router.register(r'notifications', NotificationViewSet,
                basename='notifications')

urlpatterns = [
    path('stats/', UserStatsView.as_view(), name='user-stats'),
    path('', include(router.urls)),
]

urlpatterns += router.urls
