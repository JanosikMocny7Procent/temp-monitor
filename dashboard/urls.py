from django.urls import path
from . import views  # Kropka oznacza "zaimportuj z tego samego folderu"

#funkcja path mówi weź defaultowy adres https i uruchom funkcję home z pliku views
urlpatterns = [
    # Pusty cudzysłów '' oznacza stronę główną (http://127.0.0.1:8000/)
    path('', views.home, name='home'),
]