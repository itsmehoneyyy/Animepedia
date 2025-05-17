from django.contrib import admin
from .models import (
    Anime, Genre, AnimeGenre,
    Platform, AnimePlatform,
    UserAnimeList, Review
)

@admin.register(Anime)
class AnimeAdmin(admin.ModelAdmin):
    list_display = (
        'title_en', 'title_th', 'year', 'avg_rating',
        'display_genres', 'display_platforms'
    )
    list_filter = ('year', 'studio', 'genres', 'platforms')
    search_fields = ('title_en', 'title_th', 'description')
    ordering = ('-year',)

    def display_genres(self, obj):
        return ", ".join(g.name for g in obj.genres.all())
    display_genres.short_description = 'Genres'

    def display_platforms(self, obj):
        return ", ".join(p.name for p in obj.platforms.all())
    display_platforms.short_description = 'Platforms'


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_url')
    search_fields = ('name',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('anime', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('anime__title_en', 'user__username', 'comment')
    date_hierarchy = 'created_at'


@admin.register(UserAnimeList)
class UserAnimeListAdmin(admin.ModelAdmin):
    list_display = ('user', 'anime', 'status')
    list_filter = ('status',)
    search_fields = ('user__username', 'anime__title_en')


@admin.register(AnimeGenre)
class AnimeGenreAdmin(admin.ModelAdmin):
    list_display = ('anime', 'genre')


@admin.register(AnimePlatform)
class AnimePlatformAdmin(admin.ModelAdmin):
    list_display = ('anime', 'platform', 'watch_url')
