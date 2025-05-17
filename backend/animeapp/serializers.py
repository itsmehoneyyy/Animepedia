from rest_framework import serializers
from .models import (
    Anime, Genre, AnimeGenre,
    Platform, AnimePlatform,
    UserAnimeList, Review
)

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'

class AnimeSerializer(serializers.ModelSerializer):
    genre_names     = serializers.SerializerMethodField()
    platforms_info  = serializers.SerializerMethodField()

    class Meta:
        model  = Anime
        fields = [
            'id', 'title_th', 'title_en', 'description',
            'year', 'studio', 'poster_url', 'avg_rating',
            'genre_names', 'platforms_info',
        ]

    def get_genre_names(self, obj):
        return list(obj.genres.values_list('name', flat=True))

    def get_platforms_info(self, obj):
        # ดึง AnimePlatform ทั้งหมดของอนิเมะเรื่องนี้ พร้อม platform ที่เกี่ยวข้อง
        platform_links = AnimePlatform.objects.filter(anime=obj).select_related('platform')
        return [
            {
                "name": ap.platform.name,
                "logo_url": ap.platform.logo_url,
                "watch_url": ap.watch_url
            }
            for ap in platform_links
        ]

        
class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model  = Review
        fields = ('id','username','rating','comment','created_at')

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('rating', 'comment')

    def create(self, validated_data):
        user = self.context['request'].user
        anime = self.context['anime']
        return Review.objects.create(user=user, anime=anime, **validated_data)



class UserAnimeListSerializer(serializers.ModelSerializer):
    anime = serializers.PrimaryKeyRelatedField(queryset=Anime.objects.all())

    class Meta:
        model = UserAnimeList
        fields = ('anime','status')

    def create(self, validated_data):
        user = self.context['request'].user
        obj, _ = UserAnimeList.objects.update_or_create(
            user=user,
            anime=validated_data['anime'],
            defaults={'status': validated_data['status']}
        )
        return obj

