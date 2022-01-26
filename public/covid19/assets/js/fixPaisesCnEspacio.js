const correcionEpaciosPais = (nombrepais) => {

    let resuestanombre = nombrepais

    switch (resuestanombre) {
        case "United Kingdom":
            resuestanombre = "GB"
            break;
        case "South Africa":
            resuestanombre = "ZA"
            break;
        case "United Arab Emirates":
            resuestanombre = "AE"
            break;
        case "Korea, South":
            resuestanombre = "KR"
            break;
        case "Saudi Arabia":
            resuestanombre = "SA"
            break;
        case "Costa Rica":
            resuestanombre = "CR"
            break;
        case "Sri Lanka":
            resuestanombre = "LK"
            break;
        case "Dominican Republic":
            resuestanombre = "DO"
            break;
        case "West Bank and Gaza":
            resuestanombre = "PS"
            break;
        case "Bosnia and Herzegovina":
            resuestanombre = "BA"
            break;
        case "North Macedonia":
            resuestanombre = "MK"
            break;
        case "El Salvador":
            resuestanombre = "SV"
            break;
        case "Trinidad and Tobago":
            resuestanombre = "TT"
            break;
        case "Congo (Kinshasa)":
            resuestanombre = "CG"
            break;
        case "Cote d'Ivoire":
            resuestanombre = "CI"
            break;
        case "Papua New Guinea":
            resuestanombre = "PG"
            break;
        case "Congo (Brazzaville)":
            resuestanombre = "CD"
            break;
        case "Burkina Faso":
            resuestanombre = "BF"
            break;
        case "Saint Lucia":
            resuestanombre = "LC"
            break;
        case "South Sudan":
            resuestanombre = "SS"
            break;
        case "Equatorial Guinea":
            resuestanombre = "GQ"
            break;
        case "New Zealand":
            resuestanombre = "NZ"
            break;
        case "Central African Republic":
            resuestanombre = "CF"
            break;
        case "San Marino":
            resuestanombre = "SM"
            break;
        case "Sierra Leone":
            resuestanombre = "SL"
            break;
        case "Saint Vincent and the Grenadines":
            resuestanombre = "VC"
            break;
        case "Sao Tome and Principe":
            resuestanombre = "ST"
            break;
        case "Antigua and Barbuda":
            resuestanombre = "AG"
            break;
        case "Saint Kitts and Nevis":
            resuestanombre = "KN"
            break;
        case "Holy See":
            resuestanombre = "VA"
            break;
        case "Solomon Islands":
            resuestanombre = "SB"
            break;
        case "Marshall Islands":
            resuestanombre = "MH"
            break;
        case "Cabo Verde":
            resuestanombre = "CV"
            break;
        case "Taiwan*":
            resuestanombre = "TW"
            break;
        case "Timor-Leste":
            resuestanombre = "TL"
            break;
        case "Guinea-Bissau":
            resuestanombre = "GW"
            break;
        case "MS Zaandam":
            resuestanombre = "MS_Zaandam"
            break;
        case "Summer Olympics 2020":
            resuestanombre = "Summer_Olympics_2020"
            break;
        case "Diamond Princess":
            resuestanombre = "Diamond_Princess"
            break;
        default:
            resuestanombre = nombrepais
            break;
    };

    return resuestanombre

};

export default correcionEpaciosPais