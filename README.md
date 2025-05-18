## Animepedia
Animepedia (อนิเมะพีเดีย) เว็บไซต์รวมรวบข้อมูลอนิเมะและแพลตฟอร์มดูอนิเมะในไทย

## (commit อาจจะแปลกๆเพราะลองทำ deploy render ย้ายไฟล์ไปมาจน path พัง buld ไม่ได้ เลยจบที่ย้อนกลับมาตัวเก่าค่ะ)

# Animepedia Backend & Frontend

## Setup (ครั้งแรกของแต่ละเครื่อง)
1. git clone https://github.com/itsmehoneyyy/Animepedia ,cd Animepedia
2. cd backend && python -m venv venv && venv\Scripts\activate
3. pip install -r requirements.txt
4. cd ../frontend && npm install
5. cd .. (root)
6. docker compose up -d

## พัฒนา & ทดสอบ
- เข้าหน้า Dev:
  - Backend: http://localhost:8000
  - Backend-admin: http://localhost:8000/admin/
  - Frontend: http://localhost:3000


git init
git remote add origin https://github.com/itsmehoneyyy/Animepedia.git
git pull origin main --allow-unrelated-histories
git remote -v

git add .
git commit -m "update frintend homepage"
git branch -M main
git push -u origin main

docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate


| สถานะ                 | คำสั่ง                   | การกระทำ                            |
| --------------------- | ------------------------ | ----------------------------------- |
| หยุดชั่วคราว (pause)     | `docker compose stop`    | หยุด container แต่เก็บข้อมูลไว้     |
| เริ่มใหม่                 | `docker compose start`   | สตาร์ท container ที่หยุดไว้         |
| รีสตาร์ท                | `docker compose restart` | หยุดแล้วสตาร์ทใหม่อีกครั้ง          |
| ลบ containers+network | `docker compose down`    | หยุด+ลบ container & network         |
| ลบรวม volume ด้วย      | `docker compose down -v` | ลบ container, network & data volume |



docker compose exec backend python manage.py show_urls
/admin/ django.contrib.admin.sites.index        admin:index
/admin/<app_label>/     django.contrib.admin.sites.app_index    admin:app_list
/admin/<url>    django.contrib.admin.sites.catch_all_view
/admin/animeapp/anime/  django.contrib.admin.options.changelist_view    admin:animeapp_anime_changelist
/admin/animeapp/anime/<path:object_id>/ django.views.generic.base.RedirectView
/admin/animeapp/anime/<path:object_id>/change/  django.contrib.admin.options.change_view        admin:animeapp_anime_change
/admin/animeapp/anime/<path:object_id>/delete/  django.contrib.admin.options.delete_view        admin:animeapp_anime_delete
/admin/animeapp/anime/<path:object_id>/history/ django.contrib.admin.options.history_view       admin:animeapp_anime_history
/admin/animeapp/anime/add/      django.contrib.admin.options.add_view   admin:animeapp_anime_add
/admin/animeapp/animegenre/     django.contrib.admin.options.changelist_view    admin:animeapp_animegenre_changelist
/admin/animeapp/animegenre/<path:object_id>/    django.views.generic.base.RedirectView
/admin/animeapp/animegenre/<path:object_id>/change/     django.contrib.admin.options.change_view        admin:animeapp_animegenre_change   
/admin/animeapp/animegenre/<path:object_id>/delete/     django.contrib.admin.options.delete_view        admin:animeapp_animegenre_delete   
/admin/animeapp/animegenre/<path:object_id>/history/    django.contrib.admin.options.history_view       admin:animeapp_animegenre_history  
/admin/animeapp/animegenre/add/ django.contrib.admin.options.add_view   admin:animeapp_animegenre_add
/admin/animeapp/animeplatform/  django.contrib.admin.options.changelist_view    admin:animeapp_animeplatform_changelist
/admin/animeapp/animeplatform/<path:object_id>/ django.views.generic.base.RedirectView
/admin/animeapp/animeplatform/<path:object_id>/change/  django.contrib.admin.options.change_view        admin:animeapp_animeplatform_change
/admin/animeapp/animeplatform/<path:object_id>/delete/  django.contrib.admin.options.delete_view        admin:animeapp_animeplatform_delete
/admin/animeapp/animeplatform/<path:object_id>/history/ django.contrib.admin.options.history_view       admin:animeapp_animeplatform_history
/admin/animeapp/animeplatform/add/      django.contrib.admin.options.add_view   admin:animeapp_animeplatform_add
/admin/animeapp/genre/  django.contrib.admin.options.changelist_view    admin:animeapp_genre_changelist
/admin/animeapp/genre/<path:object_id>/ django.views.generic.base.RedirectView
/admin/animeapp/genre/<path:object_id>/change/  django.contrib.admin.options.change_view        admin:animeapp_genre_change
/admin/animeapp/genre/<path:object_id>/delete/  django.contrib.admin.options.delete_view        admin:animeapp_genre_delete
/admin/animeapp/genre/<path:object_id>/history/ django.contrib.admin.options.history_view       admin:animeapp_genre_history
/admin/animeapp/genre/add/      django.contrib.admin.options.add_view   admin:animeapp_genre_add
/admin/animeapp/platform/       django.contrib.admin.options.changelist_view    admin:animeapp_platform_changelist
/admin/animeapp/platform/<path:object_id>/      django.views.generic.base.RedirectView
/admin/animeapp/platform/<path:object_id>/change/       django.contrib.admin.options.change_view        admin:animeapp_platform_change     
/admin/animeapp/platform/<path:object_id>/delete/       django.contrib.admin.options.delete_view        admin:animeapp_platform_delete     
/admin/animeapp/platform/<path:object_id>/history/      django.contrib.admin.options.history_view       admin:animeapp_platform_history    
/admin/animeapp/platform/add/   django.contrib.admin.options.add_view   admin:animeapp_platform_add
/admin/animeapp/review/ django.contrib.admin.options.changelist_view    admin:animeapp_review_changelist
/admin/animeapp/review/<path:object_id>/        django.views.generic.base.RedirectView
/admin/animeapp/review/<path:object_id>/change/ django.contrib.admin.options.change_view        admin:animeapp_review_change
/admin/animeapp/review/<path:object_id>/delete/ django.contrib.admin.options.delete_view        admin:animeapp_review_delete
/admin/animeapp/review/<path:object_id>/history/        django.contrib.admin.options.history_view       admin:animeapp_review_history      
/admin/animeapp/review/add/     django.contrib.admin.options.add_view   admin:animeapp_review_add
/admin/animeapp/useranimelist/  django.contrib.admin.options.changelist_view    admin:animeapp_useranimelist_changelist
/admin/animeapp/useranimelist/<path:object_id>/ django.views.generic.base.RedirectView
/admin/animeapp/useranimelist/<path:object_id>/change/  django.contrib.admin.options.change_view        admin:animeapp_useranimelist_change
/admin/animeapp/useranimelist/<path:object_id>/delete/  django.contrib.admin.options.delete_view        admin:animeapp_useranimelist_delete
/admin/animeapp/useranimelist/<path:object_id>/history/ django.contrib.admin.options.history_view       admin:animeapp_useranimelist_history
/admin/animeapp/useranimelist/add/      django.contrib.admin.options.add_view   admin:animeapp_useranimelist_add
/admin/auth/group/      django.contrib.admin.options.changelist_view    admin:auth_group_changelist
/admin/auth/group/<path:object_id>/     django.views.generic.base.RedirectView
/admin/auth/group/<path:object_id>/change/      django.contrib.admin.options.change_view        admin:auth_group_change
/admin/auth/group/<path:object_id>/delete/      django.contrib.admin.options.delete_view        admin:auth_group_delete
/admin/auth/group/<path:object_id>/history/     django.contrib.admin.options.history_view       admin:auth_group_history
/admin/auth/group/add/  django.contrib.admin.options.add_view   admin:auth_group_add
/admin/autocomplete/    django.contrib.admin.sites.autocomplete_view    admin:autocomplete
/admin/jsi18n/  django.contrib.admin.sites.i18n_javascript      admin:jsi18n
/admin/login/   django.contrib.admin.sites.login        admin:login
/admin/logout/  django.contrib.admin.sites.logout       admin:logout
/admin/password_change/ django.contrib.admin.sites.password_change      admin:password_change
/admin/password_change/done/    django.contrib.admin.sites.password_change_done admin:password_change_done
/admin/r/<path:content_type_id>/<path:object_id>/       django.contrib.contenttypes.views.shortcut      admin:view_on_site
/admin/token_blacklist/blacklistedtoken/        django.contrib.admin.options.changelist_view    admin:token_blacklist_blacklistedtoken_changelist
/admin/token_blacklist/blacklistedtoken/<path:object_id>/       django.views.generic.base.RedirectView
/admin/token_blacklist/blacklistedtoken/<path:object_id>/change/        django.contrib.admin.options.change_view        admin:token_blacklist_blacklistedtoken_change
/admin/token_blacklist/blacklistedtoken/<path:object_id>/delete/        django.contrib.admin.options.delete_view        admin:token_blacklist_blacklistedtoken_delete
/admin/token_blacklist/blacklistedtoken/<path:object_id>/history/       django.contrib.admin.options.history_view       admin:token_blacklist_blacklistedtoken_history
/admin/token_blacklist/blacklistedtoken/add/    django.contrib.admin.options.add_view   admin:token_blacklist_blacklistedtoken_add
/admin/token_blacklist/outstandingtoken/        django.contrib.admin.options.changelist_view    admin:token_blacklist_outstandingtoken_changelist
/admin/token_blacklist/outstandingtoken/<path:object_id>/       django.views.generic.base.RedirectView
/admin/token_blacklist/outstandingtoken/<path:object_id>/change/        django.contrib.admin.options.change_view        admin:token_blacklist_outstandingtoken_change
/admin/token_blacklist/outstandingtoken/<path:object_id>/delete/        django.contrib.admin.options.delete_view        admin:token_blacklist_outstandingtoken_delete
/admin/token_blacklist/outstandingtoken/<path:object_id>/history/       django.contrib.admin.options.history_view       admin:token_blacklist_outstandingtoken_history
/admin/token_blacklist/outstandingtoken/add/    django.contrib.admin.options.add_view   admin:token_blacklist_outstandingtoken_add
/admin/users/customuser/        django.contrib.admin.options.changelist_view    admin:users_customuser_changelist
/admin/users/customuser/<id>/password/  django.contrib.auth.admin.user_change_password  admin:auth_user_password_change
/admin/users/customuser/<path:object_id>/       django.views.generic.base.RedirectView
/admin/users/customuser/<path:object_id>/change/        django.contrib.admin.options.change_view        admin:users_customuser_change      
/admin/users/customuser/<path:object_id>/delete/        django.contrib.admin.options.delete_view        admin:users_customuser_delete      
/admin/users/customuser/<path:object_id>/history/       django.contrib.admin.options.history_view       admin:users_customuser_history     
/admin/users/customuser/add/    django.contrib.auth.admin.add_view      admin:users_customuser_add
/api/   rest_framework.routers.APIRootView      api-root
/api/<drf_format_suffix:format> rest_framework.routers.APIRootView      api-root
/api/animes/    animeapp.views.AnimeViewSet     anime-list
/api/animes/<int:pk>/reviews/   animeapp.views.ReviewCreateAPIView      anime-review
/api/animes/<pk>/       animeapp.views.AnimeViewSet     anime-detail
/api/animes/<pk>\.<format>/     animeapp.views.AnimeViewSet     anime-detail
/api/animes\.<format>/  animeapp.views.AnimeViewSet     anime-list
/api/auth/login/        rest_framework_simplejwt.views.TokenObtainPairView      token_obtain_pair
/api/auth/refresh/      rest_framework_simplejwt.views.TokenRefreshView token_refresh
/api/auth/register/     users.views.RegisterView        register
/api/my-list/   animeapp.views.UserAnimeListAPIView     my-list
