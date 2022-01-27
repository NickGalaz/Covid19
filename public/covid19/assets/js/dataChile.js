import { generarGraficoChile } from './SituacionChile.js';

// DATOS SITUACIÓN CHILE
let sCConfirmados;
let sCMuertos;
let sCRecuperados;
let indexCarga = 0;
let cantidaddecarga = document.getElementById("cargandocantidad");
let cargando = document.getElementById("cargando");

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
            sCConfirmados = data;
            indexCarga++;
            if (indexCarga == 3) {
                cantidaddecarga.innerHTML = "";
                cargando.innerHTML = "";
                generarGraficoChile(sCConfirmados, sCMuertos, sCRecuperados);
            } else {
                cantidaddecarga.innerHTML = `Cargando... ${indexCarga}/3 archivos listos.`;
            };
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
            sCMuertos = data;
            indexCarga++;
            if (indexCarga == 3) {
                cargando.innerHTML = "";
                generarGraficoChile(sCConfirmados, sCMuertos, sCRecuperados);
                cantidaddecarga.innerHTML = "";
            } else {
                cantidaddecarga.innerHTML = `Cargando... ${indexCarga}/3 archivos listos.`;
            };
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
            sCRecuperados = data;
            indexCarga++;
            if (indexCarga == 3) {
                cantidaddecarga.innerHTML = "";
                cargando.innerHTML = "";
                generarGraficoChile(sCConfirmados, sCMuertos, sCRecuperados);
            } else {
                cantidaddecarga.innerHTML = `Cargando... ${indexCarga}/3 archivos listos.`;
            };
        }
    } catch (error) {
        localStorage.clear();
        console.log('Error (recovered): ', error);
    }

}

export { sCConfirmados, sCMuertos, sCRecuperados, indexCarga, cantidaddecarga, cargando }
export { requestDataChile, getConfirmed, getDeaths, getRecovered }