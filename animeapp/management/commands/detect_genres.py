from django.core.management.base import BaseCommand
from animeapp.models import Anime, Genre, AnimeGenre
from animeapp.utils import detect_genres_from_text

class Command(BaseCommand):
    help = "Detect and assign genres for all Anime"

    def handle(self, *args, **options):
        for anime in Anime.objects.all():
            names = detect_genres_from_text(anime.description)
            anime.genres.clear()
            for name in names:
                genre_obj, _ = Genre.objects.get_or_create(name=name)
                AnimeGenre.objects.get_or_create(anime=anime, genre=genre_obj)
        self.stdout.write(self.style.SUCCESS("✅ All genres detected."))
