from django.shortcuts import render

#funkcja home używana w urls.py
def home(request):
    # Ta funkcja bierze plik index.html i wysyła go do przeglądarki
    return render(request, 'index.html')

def main(request):
    return render(request, 'main.html')