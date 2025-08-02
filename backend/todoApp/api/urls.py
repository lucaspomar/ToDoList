from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers

from .views import TodoViewSet, UserRegisterView

router = routers.DefaultRouter()

router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]