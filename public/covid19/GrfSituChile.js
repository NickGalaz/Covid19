const graficoSituacionChile = async () => {

    const labels = "fechas";
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: "asdasd",
                borderColor: "rgb(243, 111, 221)",
                backgroundColor: "rgb(243, 111, 221)",
            },
            {
                label: 'Dataset 2',
                data: "asdasdasd",
                borderColor: "rgb(243, 111, 221)",
                backgroundColor: "rgb(243, 111, 221)",
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Situacion Chile'
                }
            }
        },
    };



    const myChart = new Chart(
        document.getElementById('GraficoSituacionChile'),
        config
    );

};