const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/total');
        const { data } = await response.json();
        console.log('Data API:', data);
        agregarData(data);
        generateChart(newData);
        datoTabla(data);
        graficoDetalle(newData);

    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

// Conseguir datos de todos los países
const getDataCountry = async (pais) => {
    try {
        const response = await fetch(`http://localhost:3000/api/countries/${pais}`);
        const { data } = await response.json();
        console.log('Data API country: ', data);
        if (data) {
            graficoDetalle(data);
        }
        return data
    } catch (error) {
        console.log(`Error en getDataCountry: ${error}`);
    }
}


// DATOS SITUACIÓN CHILE
const requestDataChile = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login',
            {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password })
            });
        const { token } = await response.json();
        localStorage.setItem('jwt-token', token);
        return token
    } catch (error) {
        console.log(`Error en requestDataChile: ${error}`);
    }
}
// Solicitud datos confirmados
const getConfirmed = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/confirmed',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        const { data } = await response.json();
        if (data) {
            console.log('Data API (confirmed): ', data);
        }
    } catch (error) {
        localStorage.clear();
        console.log('Error (confirmed): ', error);
    }

}
// Solicitud datos muertes
const getDeaths = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/deaths',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        const { data } = await response.json();
        if (data) {
            console.log('Data API (deaths): ', data);
        }
    } catch (error) {
        localStorage.clear();
        console.log('Error (deaths): ', error);
    }

}
// Solicitud datos recuperados
const getRecovered = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/recovered',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        const { data } = await response.json();
        if (data) {
            console.log('Data API (recovered): ', data);
        }
    } catch (error) {
        localStorage.clear();
        console.log('Error (recovered): ', error);
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

const toggles = () => {
    $('#iniciarSesion').toggle();
    $('#cerrarSesion').toggle();
    $('#situacionChile').toggle();
}

const init = async () => {
    const token = localStorage.getItem('jwt-token');
    console.log(token);
    if (token) {
        getConfirmed(token);
        getDeaths(token);
        getRecovered(token);
        toggles();
    }
}

const logOut = () => {
    localStorage.clear();
    window.location.reload();
}

window.onload = function () {
    getData();
    init();
    $('#cerrarSesion').click(function () {
        console.log('click');
        logOut();
    });

    $('#js-form').submit(async (e) => {
        e.preventDefault()
        $('#dataContainer').toggle();
        $('#logeo').modal('hide');
        $('#cerrarSesion').click(function () {
            console.log('click');
            logOut();
        });
        const email = document.getElementById('js-input-email').value
        const password = document.getElementById('js-input-password').value
        const JWT = await requestDataChile(email, password);
        getConfirmed(JWT);
        getDeaths(JWT);
        getRecovered(JWT);
        init();
    })
}