from rest_framework import serializers
from .models import GameLevel, GameSession, Notification, UserProfile, UserDetail, Game
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class GameLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameLevel
        fields = 'all'


class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = 'all'
        read_only_fields = ['user', 'number_to_guess',
                            'attempts', 'is_active', 'is_won', 'created_at']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class GameLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameLevel
        fields = '__all__'


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['id', 'username', 'email', 'is_active', 'is_suspended']


class UserProfileStatsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = UserProfile
        fields = ['user', 'total_games', 'total_wins', 'best_score']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class GameHistorySerializer(serializers.ModelSerializer):
    level = serializers.StringRelatedField()

    class Meta:
        model = Game
        fields = ['id', 'level', 'number_range',
                  'score', 'attempts', 'result', 'created_at']


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = UserProfile
        fields = ['user', 'total_games', 'total_wins', 'best_score']


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['username', 'email']


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True,
                                         validators=[validate_password])


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # You can include additional user info in the response if needed data.update({ 'user_id': self.user.id, 'username': self.user.username, 'email': self.user.email, 'is_staff': self.user.is_staff, }) return data
        data = super().validate(attrs)
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    # full_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            # full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        return user
