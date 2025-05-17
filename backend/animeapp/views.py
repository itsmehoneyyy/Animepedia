from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, permissions
from .models import Anime, UserAnimeList, Review, Genre, Platform
from .serializers import (AnimeSerializer,ReviewCreateSerializer,UserAnimeListSerializer,GenreSerializer, PlatformSerializer)

class AnimeViewSet(viewsets.ModelViewSet):
    serializer_class = AnimeSerializer

    def get_queryset(self):
        queryset = Anime.objects.all().prefetch_related('genres', 'platforms')
        params = self.request.query_params
        genres = params.getlist('genres__name')
        for genre in genres:
            queryset = queryset.filter(genres__name=genre)
        platforms = params.getlist('platforms__name')
        for platform in platforms:
            queryset = queryset.filter(platforms__name=platform)

        search = params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title_th__icontains=search) |
                Q(title_en__icontains=search) |
                Q(description__icontains=search)
            )

        ordering = params.get('ordering')
        if ordering:
            queryset = queryset.order_by(ordering)
        if 'year' in params:
            queryset = queryset.filter(year=params['year'])
        if 'studio' in params:
            queryset = queryset.filter(studio__icontains=params['studio'])

        return queryset.distinct()


class ReviewCreateAPIView(generics.CreateAPIView):
    serializer_class    = ReviewCreateSerializer
    permission_classes  = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        anime = get_object_or_404(Anime, pk=self.kwargs['pk'])
        serializer.save(user=self.request.user, anime=anime)


class UserAnimeListAPIView(generics.ListCreateAPIView):
    serializer_class    = UserAnimeListSerializer
    permission_classes  = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserAnimeList.objects.filter(user=self.request.user)

class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class PlatformViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer