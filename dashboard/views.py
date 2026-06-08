from django.shortcuts import render
from django.http import JsonResponse
import json
import random

#funkcja home używana w urls.py
def home(request):
    # Ta funkcja bierze plik index.html i wysyła go do przeglądarki
    return render(request, 'index.html')

def main(request):
    return render(request, 'main.html')

#Do losowych temperatur
# def get_temp(request):
#     fake_temp = random.uniform(34, 42)
#     fake_temp=round(fake_temp, 1)
#     return JsonResponse({'temperature': fake_temp})




from django.views.decorators.csrf import csrf_exempt
from .models import TemperatureReading # Assuming you have a model

@csrf_exempt # Allows the Pi to send data without a login token
def get_temp(request): #def receive_sensor_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        temp = data.get('temp')
        
        # Save to database
        TemperatureReading.objects.create(value=temp)
        
        return JsonResponse({"status": "success"})
