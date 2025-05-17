import os
import pandas as pd
from django.core.management.base import BaseCommand
from animeapp.models import Anime, Platform, AnimePlatform
from django.db import transaction

class Command(BaseCommand):
    help = 'Import anime and platform data from Excel files'

    def handle(self, *args, **kwargs):
        base_dir = os.path.dirname(__file__)
        anime_file = os.path.join(base_dir, "anime_list.xlsx")
        platform_file = os.path.join(base_dir, "anime_platforms.xlsx")

        anime_df = pd.read_excel(anime_file)
        platform_df = pd.read_excel(platform_file)

        with transaction.atomic():
            for _, row in anime_df.iterrows():
                anime, created = Anime.objects.get_or_create(
                    title_th=row['title_th'],
                    title_en=row['title_en'],
                    defaults={
                        'description': row['description'],
                        'year': int(row['year']),
                        'studio': row['studio'],
                        'poster_url': row['poster_url'],
                        'avg_rating': 0  # ตั้งเป็น 0 ไว้ก่อน
                    }
                )

            for _, row in platform_df.iterrows():
                anime = Anime.objects.filter(title_en=row['title_en']).first()
                if not anime:
                    self.stdout.write(self.style.WARNING(f"⚠️ Anime not found: {row['title_en']}"))
                    continue

                platform, _ = Platform.objects.get_or_create(name=row['platform_name'])

                AnimePlatform.objects.get_or_create(
                    anime=anime,
                    platform=platform,
                    defaults={'watch_url': row['watch_url']}
                )

        self.stdout.write(self.style.SUCCESS("✅ Import complete."))
