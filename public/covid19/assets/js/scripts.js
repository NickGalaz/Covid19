import { getData } from './dataPaises.js';
import { sCConfirmados, sCMuertos, sCRecuperados } from './dataChile.js';
import { requestDataChile, getConfirmed, getDeaths, getRecovered } from './dataChile.js';
import { generarGraficoChile } from './SituacionChile.js';

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
        e.preventDefault();
        //$('#dataContainer').toggle();
        $('#logeo').modal('hide');
        $('#cerrarSesion').click(function () {
            console.log('click');
            logOut();
        });
        const email = document.getElementById('js-input-email').value;
        const password = document.getElementById('js-input-password').value;
        const JWT = await requestDataChile(email, password);
        getConfirmed(JWT);
        getDeaths(JWT);
        getRecovered(JWT);
        init();
    });

    $('#situacionChile').click(function () {

        $('#dataContainer').hide();
        $('#situacionChileGrafico').show();

        if (sCConfirmados == undefined || sCMuertos == undefined || sCRecuperados == undefined) {

            $('#cargando').show();
            console.log("espera un momento")

        } else {

            $('#cargando').hide();
            generarGraficoChile(sCConfirmados, sCMuertos, sCRecuperados);

        }
    });

    $('#home').click(function () {
        $('#dataContainer').show();
        $('#situacionChileGrafico').hide();
    });
}