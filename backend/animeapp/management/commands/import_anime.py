import pandas as pd
from django.core.management.base import BaseCommand
from django.db import transaction
from animeapp.models import Anime, Genre, Platform, AnimeGenre, AnimePlatform

class Command(BaseCommand):
    help = 'Import anime data from Excel'

    def add_arguments(self, parser):
        parser.add_argument(
            'file_path',
            type=str,
            help='Path to the Excel file to import'
        )

    @transaction.atomic
    def handle(self, *args, **options):
        file_path = options['file_path']
        df = pd.read_excel(file_path)

        # Ensure genres and platforms exist
        for genre_name in set(','.join(df['genres']).split(',')):
            genre_name = genre_name.strip()
            if genre_name:
                Genre.objects.get_or_create(name=genre_name)

        for plat_name in set(','.join(df['platforms']).split(',')):
            plat_name = plat_name.strip()
            if plat_name:
                Platform.objects.get_or_create(name=plat_name)

        # Import each row
        for _, row in df.iterrows():
            anime, _ = Anime.objects.update_or_create(
                title_th=row['title_th'],
                defaults={
                    'title_en': row['title_en'],
                    'description': row['description'],
                    'year': int(row['year']),
                    'studio': row['studio'],
                    'poster_url': row['poster_url'],
                    'avg_rating': float(row['avg_rating']),
                }
            )

            # Link genres
            genre_list = [g.strip() for g in row['genres'].split(',') if g.strip()]
            anime.genres.clear()
            for gname in genre_list:
                genre = Genre.objects.get(name=gname)
                AnimeGenre.objects.create(anime=anime, genre=genre)

            # Link platforms and watch URLs
            plats = [p.strip() for p in row['platforms'].split(',') if p.strip()]
            urls = [u.strip() for u in row['platform_watch_urls'].split(',') if u.strip()]
            anime.platforms.clear()
            for pname, url in zip(plats, urls):
                platform = Platform.objects.get(name=pname)
                AnimePlatform.objects.create(anime=anime, platform=platform, watch_url=url)

        self.stdout.write(self.style.SUCCESS('Imported anime data successfully.'))
