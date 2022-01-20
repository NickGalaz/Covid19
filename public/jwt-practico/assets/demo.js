const getPostCountry = async(country) => {
    try {
        const response = await fetch(`http://localhost:3000/api/countries/${country}`);
        const { data } = await response.json();
        console.log(data)
        if (data) {
            getCountryChart(data)
        }
        return data
    } catch (err) {
        console.error(`Error: ${err}`)
    }
}
//casos
let activos = [];
let muertos = [];

let paisConf= [];
let paisMuertos = [];

// canvas js
const getDataChart = (data) => {
    let dataComplete = data;
    let arrayfilter = dataComplete.filter((m) => {
        return m.confirmed > 1500000;
    });
    console.log(arrayfilter);
    arrayfilter.forEach((k) => {
        activos.push({
            label: k.location,
            y: k.confirmed,
        });
        muertos.push({
            label: k.location,
            y: k.deaths
        })
    });
    console.log(activos)
    let config = {
        animationEnabled: true,
        theme: "dark1",
        title: {
            text: "Casos covid-19 a nivel mundial",
            fontFamily: 'Open Sans',
            fontWeight: "normal",
        },
        axisX: {
            title: "",
            labelAngle: 45,
            interval: 1,
            labelFontColor: "#fff",

        },
        axisY: {
            title: "",
            titleFontColor: "#a3a3a3",
            lineColor: "#a3a3a3",
            labelFontColor: "#6d78ad",
            tickColor: "#a3a3a3",
            gridThickness: 1
        },

        legend: {
            cursor: "pointer",
        },
        dataPointWidth: 15,
        height: 350,

        data: [{
                type: "column",
                name: "total confirmados",
                legendText: "Confirmados",
                showInLegend: true,
                dataPoints: activos
            },
            {
                type: "column",
                name: "total muertes",
                legendText: "Muertes",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: muertos
            }
        ]
    };
    let chart = new CanvasJS.Chart("covidChart", config);
    chart.render();

    // grafico pais
    function datoTabla(datafilter) {
        let texto = "<tr><th>Paises</th><th>Confirmados</th><th>Muertos</th><th>Gráfico</th></tr>";
        for (let i = 0; i < datafilter.length; i++) {
            texto += `<tr>
                    <td>${datafilter[i].location}</td>
                    <td>${datafilter[i].confirmed}</td>
                    <td>${datafilter[i].deaths}</td>
                    <td><button type="button" class="btnCountry btn btn-outline-success" data-toggle="modal" data-target="#chartPais" value="${datafilter[i].location}">detalles</button></td>              
                    </tr>`;
        }
        document.querySelector("#tabla-covid").innerHTML = texto;
    }

    // <!-- tabla esto va en HTML-->
    // <section class="container" id="tablaPais">
    //     <table class="table table-striped id="tabla-covid"></table>

    datoTabla(dataComplete);
    $(".btnCountry").click(function() {
        paisConf = [];
        paisMuertos = [];
        const pais = $(this).val();
        var pais2 = pais.split(' ').join('_');
        getPostCountry(pais2);
    });
}

// grafico boton
const getCountryChart = (data) => {
    let countryData = data;
    paisConf.push({
        label: countryData.location,
        y: countryData.confirmed
    });
    paisMuertos.push({
        label: countryData.location,
        y: countryData.deaths
    })
    console.log(countryApiConfirmed)
    console.log(countryApiDeath)
    let configPais = {
        animationEnabled: true,
        theme: "light1",
        title: {
            text: "Caso País"
        },
        axisX: {
            labelAngle: 0,
            interval: 1
        },
        axisY: {
            title: "Confirmados",
            titleFontColor: "#000",
            lineColor: "#000",
            labelFontColor: "#000",
            tickColor: "#000"
        },
        axisY2: {
            title: "Muertes",
            titleFontColor: "#000",
            lineColor: "#000",
            labelFontColor: "#000",
            tickColor: "#000"
        },


        dataPointWidth: 50,
        height: 200,
        data: [{
                type: "column",
                name: "total confirmados",
                legendText: "Confirmados",
                showInLegend: true,
                dataPoints: countryApiConfirmed
            },
            {
                type: "column",
                name: "total muertes",
                legendText: "Muertes",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: countryApiDeath
            },

        ]
    };
    let chart = new CanvasJS.Chart("chartPais", configPais);
    chart.render();
}

// <!-- Modal EN HTML-->
// <div class="modal fade" id="chartPais" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <div class="modal-dialog modal-dialog-centered">
//         <div class="modal-content">

//             <div class="modal-body">
//                 <div id="chartPais"></div>
//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
//             </div>
//         </div>
//     </div>
// </div>
