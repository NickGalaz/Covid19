import correcionEpaciosPais from './fixPaisesCnEspacio.js';
import { generateChart, datoTabla, graficoDetalle } from './graficoYTablaPaises.js';

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

// Conseguir datos de cada país
window.getDataCountry = async (pais) => {
    if (pais == "Summer Olympics 2020" || pais == "Diamond Princess" || pais == "MS Zaandam") {

        alert("Esta sección no registra datos.");

    } else {
        try {
            const response = await fetch(`http://localhost:3000/api/countries/${correcionEpaciosPais(pais)}`);
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
};


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

export { getData, agregarData };
export * as getDataCountry from './dataPaises.js';