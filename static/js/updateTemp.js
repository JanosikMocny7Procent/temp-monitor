//Nie będę ukrywał, wyczarowałem ten kod
//Nie mam bladego pojęcia jak to działa, ale ważne, że działa
document.addEventListener('DOMContentLoaded', function() {
    const canvasElement = document.getElementById('temp-chart');

    if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        
        // Inicjalizacja wykresu
        const tempChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], 
                datasets: [{
                    label: 'Temperatura (°C)',
                    spanGaps: true, // Łączy linię nawet jeśli brakuje punktu
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                animation: false, // Wyłączamy animacje, żeby wykres "płynął" bez skoków
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false },
                    x: { ticks: { display: false } }
                }
            }
        });

        // Funkcja aktualizująca
        function updateTemp() {
            fetch('/api/temp/')
                .then(response => response.json())
                .then(data => {
                    // Używamy parseFloat, żeby mieć pewność, że to liczba
                    const temp = parseFloat(data.temperature);
                    const now = new Date().toLocaleTimeString();

                    // Jeśli temp to nie liczba (NaN) – przerywamy tę klatkę
                    if (isNaN(temp)) return;

                    // Aktualizacja HTML
                    const display = document.getElementById('temp-value');
                    if (display) display.innerText = temp;

                    const img = document.getElementById('temp-icon');
                    if (img) {
                        if (temp > 40) img.src = "/static/images/dead.png";
                        else if (temp > 39 && temp <= 40) img.src = "/static/images/uncanny.png";
                        else if (temp > 38 && temp <= 39) img.src = "/static/images/uncanny.png";
                        else if (temp > 37 && temp <= 38) img.src = "/static/images/uncanny.png";
                        else if (temp > 36 && temp <= 37) img.src = "/static/images/canny.png";
                        else img.src = "/static/images/cold.png";
                    }

                    // Dodawanie danych
                    tempChart.data.labels.push(now);
                    tempChart.data.datasets[0].data.push(temp);

                    // PANCERNA SYNCHRONIZACJA: bierzemy zawsze ostatnie 10 elementów
                    if (tempChart.data.labels.length > 10) {
                        tempChart.data.labels = tempChart.data.labels.slice(-10);
                        tempChart.data.datasets[0].data = tempChart.data.datasets[0].data.slice(-10);
                    }

                    tempChart.update('none'); // Update bez zbędnych bajerów
                })
                .catch(error => console.error('Błąd pobierania danych:', error))
                .finally(() => {
                    // To jest sekret ciągłości: funkcja woła samą siebie po sekundzie
                    setTimeout(updateTemp, 1000);
                });
        }

        // Odpalamy pierwszy raz
        updateTemp();

    } else {
        console.error("Nie znaleziono elementu <canvas id='temp-chart'>!");
    }
});