const postData = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login',
            {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password })
            })
        const { token } = await response.json();
        localStorage.setItem('jwt-token', token);
        console.log(token);
        return token;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const getData = async (jwt) => {
    try {
        const response = await fetch('http://localhost:3000/api/total',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        const { data } = await response.json();
        if (data) {
            console.log(data);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const init = async () => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
        getData(token);
    }
}
const email = "Telly.Hoeger@billy.biz";
const password = "secret";

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Top Oil Reserves"
	},
	axisY: {
		title: "Reserves(MMbbl)"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: "MMbbl = one million barrels",
		dataPoints: [      
			{ y: 300878, label: "Venezuela" },
			{ y: 266455,  label: "Saudi" },
			{ y: 169709,  label: "Canada" },
			{ y: 158400,  label: "Iran" },
			{ y: 142503,  label: "Iraq" },
			{ y: 101500, label: "Kuwait" },
			{ y: 97800,  label: "UAE" },
			{ y: 80000,  label: "Russia" }
		]
	}]
});


window.onload = async function () {
    // Probando traer datos
    const JWT = await postData(email, password);
    getData(JWT);
    init()
}