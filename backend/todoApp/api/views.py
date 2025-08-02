from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination

from .models import Todo
from .serializers import TodoSerializer, UserSerializer

# Create your views here.

class UserRegisterView(CreateAPIView):

    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserSerializer

class TodoViewSet(viewsets.ModelViewSet):

    permission_classes = (permissions.IsAuthenticated,)

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['complete']
    search_fields = ['title', 'description']
