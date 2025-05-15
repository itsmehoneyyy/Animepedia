from rest_framework import serializers
from .models import Anime, Genre, AnimeGenre, Platform, AnimePlatform, UserAnimeList, Review

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'

class AnimeGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeGenre
        fields = '__all__'

class AnimePlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimePlatform
        fields = '__all__'

class AnimeSerializer(serializers.ModelSerializer):
    genre_names = serializers.SerializerMethodField()
    platforms_info = serializers.SerializerMethodField()

    class Meta:
        model = Anime
        fields = [
            'id', 'title_th', 'title_en', 'description',
            'year', 'studio', 'poster_url', 'avg_rating',
            'genre_names', 'platforms_info',
        ]

    def get_genre_names(self, obj):
        return list(obj.genres.values_list('name', flat=True))

    def get_platforms_info(self, obj):
        platforms = obj.platforms.all()
        return [
            {
                "name": p.name,
                "logo_url": p.logo_url,
                "base_url": p.base_url
            }
            for p in platforms
        ]

class UserAnimeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnimeList
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
