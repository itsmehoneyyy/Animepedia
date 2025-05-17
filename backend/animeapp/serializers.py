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
                "watch_url": ap.watch_url  # ✅ แสดงลิงก์ดูจริง
            }
            for ap in platform_links
        ]

        

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Review
        fields = ('id','user','anime','rating','comment','created_at')
        read_only_fields = ('id','user','created_at')

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Review
        fields = ('anime','rating','comment')

    def create(self, validated_data):
        user = self.context['request'].user
        return Review.objects.create(user=user, **validated_data)

class UserAnimeListSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserAnimeList
        fields = ('anime','status')

    def create(self, validated_data):
        user = self.context['request'].user
        obj, _ = UserAnimeList.objects.update_or_create(
            user=user,
            anime=validated_data['anime'],
            defaults={'status': validated_data['status']}
        )
        return obj
