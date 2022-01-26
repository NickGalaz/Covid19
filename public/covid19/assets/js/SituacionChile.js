// Gráfico Situación Chile
const generarGraficoChile = (sCConfirmados, sCMuertos, sCRecuperados) => {

    console.log("seccion grafico")  //bborrar estos console log dsps de explicar como funciona
    console.log(sCConfirmados)
    console.log(sCMuertos)
    console.log(sCRecuperados)

    let fechas = [];
    let numConfirmados = [];
    let numMuertos = [];
    let numRecuperados = [];

    for (let i = 0; i < sCConfirmados.length; i++) {
        fechas.push(sCConfirmados[i].date)
        numConfirmados.push(sCConfirmados[i].total)  
        numMuertos.push(sCMuertos[i].total) 
        numRecuperados.push(sCRecuperados[i].total)              
    };

    console.log("fechas")
    console.log(fechas)
    console.log("numConfirmados")
    console.log(numConfirmados)
    console.log("numMuertos")
    console.log(numMuertos)
    console.log("numRecuperados")
    console.log(numRecuperados)

    const labels = fechas;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Confirmados',
                data: numConfirmados,
                borderColor: "rgb(55, 205, 205, 1)",
                backgroundColor: "rgb(43, 181, 201, 0.8)",
            },
            {
                label: 'Muertos',
                data: numMuertos,
                borderColor: "rgb(243, 61, 31, 1)",
                backgroundColor: "rgb(243, 91, 91, 0.8)",
            },
            {
                label: 'Recuperados',
                data: numRecuperados,
                borderColor: "rgbRGBA(12, 255, 0, 1)",
                backgroundColor: "rgb(RGBA(33, 222, 0, 1), 0.8)",
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
        document.getElementById('situacionChileGr'),
        config
    );

}

export { generarGraficoChile }