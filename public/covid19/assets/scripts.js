const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/total');
        const { data } = await response.json();
        console.log('Data API:', data);
        console.log('País: ', data[1].location);
        agregarData(data);
        generateChart(newData);
        datoTabla(data);
        graficoDetalle(newData);

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const getDataCountry = async (pais) => {
    // const country = document.querySelector(".btnCountry").value;
    console.log('Value del botón ver detalle: ', pais);
    try {
        if (pais==='United Kingdom'){
            pais='GB'
        }
        const response = await fetch(`http://localhost:3000/api/countries/${pais}`);
        const { data } = await response.json();
        console.log('Data API country: ', data);
        if (data) {
            graficoDetalle(data)
        }
        return data
    } catch (error) {
        console.log(`Error en getDataCountry: ${error}`);
    }
}

const newData = [];
const agregarData = (array) => {
    // Arrays vacíos para guardar datos separados por categorías
    let active = [];
    let confirmed = [];
    let deaths = [];
    let recovered = [];

    array.forEach(element => {
        element.active = Math.floor((element.confirmed - element.deaths) * 0.4);
        element.recovered = Math.floor((element.confirmed - element.deaths) * 0.6);
        if (element.active >= 1000000) {
            // Replicar estructura del gráfico para los datos -> "{ label: data[0].location, y: data[0].recovered }"
            active.push({ label: element.location, y: element.active });
            confirmed.push({ label: element.location, y: element.confirmed });
            deaths.push({ label: element.location, y: element.deaths });
            recovered.push({ label: element.location, y: element.recovered });
        }
    });
    newData.push(active);
    newData.push(confirmed);
    newData.push(deaths);
    newData.push(recovered);
    console.log(newData);
    return newData;
}

const generateChart = async (newData) => {
    console.log('Dentro de generateChart', newData);
    const labels = newData[0].map(item => item.label);
    console.log('Arreglo de labels: ', labels)
    const container = document.getElementById('graficoCovid');
    CanvasJS.addColorSet("Covid19",
        [//colorSet Array
            "#fe5f84",
            "#ffcb5b",
            "#c8cccf",
            "#4ac1c2"
        ]);
    var chart = new CanvasJS.Chart(container, {
        colorSet: "Covid19",
        title: {
            text: "Países con Covid19",
            fontFamily: "monospace",
            fontWeight: "normal"
        },
        legend: {
            verticalAlign: "top",
            fontSize: 14,
            fontFamily: "monospace",
            fontWeight: "normal"
        },
        labels: labels,
        axisX: {
            labelFontSize: 10,
            interval: 1,
            labelAngle: -70,
            gridColor: "LightGray",
            gridThickness: 1,
            tickLength: 1,
            labelMaxWidth: 80
        },
        axisY: {
            labelFontSize: 14,
            labelFontFamily: "monospace",
            gridColor: "LightGray",
        },

        data: [  //array of dataSeries     
            { // Activos
                /*** Change type "column" to "bar", "area", "line" or "pie"***/
                type: "column",
                showInLegend: true,
                name: "Activos",
                dataPoints: newData[0]
            },
            {
                type: "column",
                showInLegend: true,
                name: "Confirmados",
                dataPoints: newData[1]
            },
            {
                type: "column",
                showInLegend: true,
                name: "Muertes",
                dataPoints: newData[2]
            },
            {
                type: "column",
                showInLegend: true,
                name: "Recuperados",
                dataPoints: newData[3]
            }
        ]

    });
    chart.render();
}

// Tabla
const datoTabla = (data) => {
    let texto = "<tr><th>Países</th><th>Confirmados</th><th>Muertos</th><th>Gráfico</th></tr>";
    for (let i = 0; i < data.length; i++) {
        texto += `<tr>
                <td>${data[i].location}</td>
                <td>${data[i].confirmed}</td>
                <td>${data[i].deaths}</td>
                <td><button type="button" class="btnCountry btn btn-outline-success" data-toggle="modal" data-target="#chartPais" onclick="getDataCountry('${data[i].location}')">Ver detalle</button></td>              
                </tr>`;
    }
    document.querySelector("#tabla-covid").innerHTML = texto;
}


// Modal
const graficoDetalle = async (pais) => {
    const modal = document.getElementById('covidChartPais');
    pais.active = Math.floor((pais.confirmed - pais.deaths) * 0.4);
    pais.recovered = Math.floor((pais.confirmed - pais.deaths) * 0.6);
    CanvasJS.addColorSet("Covid19",
        [//colorSet Array
            "#fe5f84",
            "#ffcb5b",
            "#c8cccf",
            "#4ac1c2"
        ]);
    var chart = new CanvasJS.Chart(modal, {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        colorSet: "Covid19",
        title: {
            text: pais.location
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 11,
            indexLabel: "{label} - {y}",
            dataPoints: [
                { y: pais.active, label: "Activos" },
                { y: pais.confirmed, label: "Confirmados" },
                { y: pais.deaths, label: "Muertos" },
                { y: pais.recovered, label: "Recuperados" },
            ]
        }]
    });
    chart.render();

}

window.onload = async function () {
    getData();
    const formulario = document.getElementById('js-form');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('click');
        $('#dataContainer').hide();
    })
}