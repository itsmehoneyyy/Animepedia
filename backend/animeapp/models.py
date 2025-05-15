from django.db import models
from users.models import CustomUser

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Platform(models.Model):
    name = models.CharField(max_length=100)
    logo_url = models.URLField(blank=True)
    base_url = models.URLField()

    def __str__(self):
        return self.name


class Anime(models.Model):
    title_th = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    description = models.TextField()
    year = models.PositiveIntegerField()
    studio = models.CharField(max_length=255)
    poster_url = models.URLField(blank=True)
    avg_rating = models.FloatField(default=0.0)

    genres = models.ManyToManyField(Genre, through='AnimeGenre', related_name='animes')
    platforms = models.ManyToManyField(Platform, through='AnimePlatform', related_name='animes')

    def __str__(self):
        return self.title_en or self.title_th


class AnimeGenre(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='anime_genres')
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='genre_animes')

    def __str__(self):
        return f"{self.anime.title_en} - {self.genre.name}"


class AnimePlatform(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='anime_platforms')
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE, related_name='platform_animes')
    watch_url = models.URLField()

    def __str__(self):
        return f"{self.anime.title_en} on {self.platform.name}"


class UserAnimeList(models.Model):
    STATUS_CHOICES = [
        ('watched', 'Watched'),
        ('watching', 'Watching'),
        ('want_to_watch', 'Want to Watch'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='anime_list')
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='user_lists')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.anime.title_en} ({self.status})"


class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reviews')
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()  # 1–5
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.anime.title_en}: {self.rating}"
