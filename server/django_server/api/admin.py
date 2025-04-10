from django.contrib import admin
from .models import GameLevel, UserDetail, Notification, UserProfile


@admin.register(GameLevel)
class GameLevelAdmin(admin.ModelAdmin):
    list_display = ('name', 'min_value', 'max_value')
    list_editable = ('min_value', 'max_value')


@admin.register(UserDetail)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_active', 'is_suspended')
    list_editable = ('is_active', 'is_suspended')


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('message', 'is_global', 'created_at')
    list_filter = ('is_global',)
    search_fields = ('message',)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_games', 'total_wins', 'best_score')
