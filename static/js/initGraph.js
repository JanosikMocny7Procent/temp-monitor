// 1. Inicjalizacja wykresu (musi być poza funkcją updateTemp, żeby stworzyć go tylko RAZ)
const ctx = document.getElementById('temp-chart').getContext('2d');

const existingChart = Chart.getChart("temp-chart"); // Sprawdź czy wykres istnieje
if (existingChart) {
    existingChart.destroy(); // Jeśli tak, zniszcz go
}

const tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], 
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: false }
        }
    }
});