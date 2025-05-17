from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimeViewSet, ReviewCreateAPIView, UserAnimeListAPIView, GenreViewSet, PlatformViewSet, AnimeReviewListAPIView
from users.views import RegisterView, get_user_profile, CurrentUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'animes', AnimeViewSet, basename='anime')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'platforms', PlatformViewSet, basename='platform')

urlpatterns = [
    path("", include(router.urls)),
    path('auth/login/',   TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(),     name='token_refresh'),
    path('auth/register/', RegisterView.as_view(),         name='register'),
    path('animes/<int:pk>/reviews/', ReviewCreateAPIView.as_view(), name='anime-review'),
    path('my-list/', UserAnimeListAPIView.as_view(),      name='my-list'),
    path('animes/<int:pk>/reviews/all/', AnimeReviewListAPIView.as_view(), name='anime-review-list'),
    path('auth/me/', get_user_profile, name='user-profile'),
    path('auth/me/', CurrentUserView.as_view(), name='current-user')
]