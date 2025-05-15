from django.contrib import admin
from .models import Anime, Genre, AnimeGenre, Platform, AnimePlatform, UserAnimeList, Review

admin.site.register(Anime)
admin.site.register(Genre)
admin.site.register(AnimeGenre)
admin.site.register(Platform)
admin.site.register(AnimePlatform)
admin.site.register(UserAnimeList)
admin.site.register(Review)
