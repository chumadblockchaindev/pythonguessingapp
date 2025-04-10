from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, Group, Permission

User = get_user_model()


class GameLevel(models.Model):
    LEVEL_CHOICES = [('Easy', 'Easy'), ('Hard', 'Hard'),
                     ('Expert', 'Expert'), ]
    name = models.CharField(max_length=20, choices=LEVEL_CHOICES, unique=True)
    min_value = models.IntegerField()
    max_value = models.IntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class GameSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.ForeignKey(GameLevel, on_delete=models.CASCADE)
    number_to_guess = models.IntegerField()
    attempts = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_won = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_global = models.BooleanField(default=False)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_games = models.PositiveIntegerField(default=0)
    total_wins = models.PositiveIntegerField(default=0)
    best_score = models.PositiveIntegerField(null=True, blank=True)

    def update_stats(self, game: GameSession):
        self.total_games += 1
        if game.is_won:
            self.total_wins += 1
            if not self.best_score or game.attempts < self.best_score:
                self.best_score = game.attempts
        self.save()

    def __str__(self):
        return f"{self.user.username}'s profile"


class UserDetail(AbstractUser):
    is_suspended = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    def __str__(self):
        return self.username


class Game(models.Model):
    RESULT_CHOICES = (('win', 'Win'), ('loss', 'Loss'), )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.ForeignKey(GameLevel, on_delete=models.SET_NULL, null=True)
    number_range = models.CharField(max_length=50)  # E.g. "1-100"
    score = models.PositiveIntegerField(default=0)
    attempts = models.PositiveIntegerField(default=0)
    result = models.CharField(max_length=10, choices=RESULT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.result} - {self.created_at.date()}"
