from rest_framework import viewsets, permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User

from .models import Todo
from .serializers import TodoSerializer, UserSerializer

# Create your views here.

class UserRegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class TodoViewSet(viewsets.ModelViewSet):

    permission_classes = (permissions.IsAuthenticated,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
