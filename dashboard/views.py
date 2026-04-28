from django.shortcuts import render
from django.http import JsonResponse
import random

#funkcja home używana w urls.py
def home(request):
    # Ta funkcja bierze plik index.html i wysyła go do przeglądarki
    return render(request, 'index.html')

def main(request):
    return render(request, 'main.html')

#Do losowych temperatur
def get_temp(request):
    fake_temp = random.uniform(34, 42)
    fake_temp=round(fake_temp, 1)
    return JsonResponse({'temperature': fake_temp})