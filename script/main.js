const database = firebase.database();
function getAndPlot() {
    var usersRef = database.ref('/TamilNadu/' + document.getElementById('districtselect').value);
    usersRef.on('value', snapshot => {
        console.log(snapshot.val().Name);
        console.log(snapshot.val().Deaths);
        console.log(snapshot.val().Infected);
        var districtname = snapshot.val().Name;
        var deathcount = snapshot.val().Deaths;
        var infectedcount = snapshot.val().Infected;
        var plot = document.getElementById("districtplot");
        var layout = {
            title: 'COVID-19' + " " + districtname,
            barmode: 'stack',
            xaxis: {
                autotick: false,
                ticks: 'outside',
                tick0: 0,
                dtick: 1,
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#000'
            },
            yaxis: {
                autotick: false,
                ticks: 'outside',
                tick0: 0,
                dtick: 1,
                ticklen: 15,
                tickwidth: 4,
                tickcolor: '#000'
            }
        };
        var xValue = ['Infected', 'Deaths'];
        var yValue = [infectedcount, deathcount];
        var trace1 = {
            x: xValue,
            y: yValue,
            width: [0.5, 0.5],
            type: 'bar',
            text: yValue.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: ['#fc8403', '#f02011'],
                opacity: 0.9,
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        };

        var data = [trace1];
        Plotly.newPlot(plot, data, layout);
        document.getElementById("infected").innerHTML = "Infected : " +
            infectedcount;
        document.getElementById("deaths").innerHTML = "Deaths   : " +
            deathcount;

    });
}

var totalget = database.ref('/TNTotal');
totalget.on('value', snapshot => {
    document.getElementById("totalinfected").innerHTML = "Total Infected : " + snapshot.val().TotalInfected;
    document.getElementById("totaldeaths").innerHTML = "Total Deaths   : " + snapshot.val().TotalDeaths;
    document.getElementById("totalrecovered").innerHTML ="Total Recovered : "+snapshot.val().TotalRecovered;
})
