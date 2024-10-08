Chart.defaults.elements.line.stepped = false;
Chart.defaults.elements.line.tension = 1000;

stockVal = getSelectedStock();
populateMetaData();
displayChart();

$("#stockSelector").change(function(){
    $('#stockForm').submit();
});

function displayChart() {
    var temp = eval({"price": 0, "timeTrend": 0});
    var socket2 = new WebSocket('ws://' + location.host + '/intraday-trend/' + stockVal);
    var prevTimeStamp = 0;
    var updatePrice = true
    socket2.addEventListener('message', ev => {
        data = JSON.parse(ev.data)
        //console.log(data)

        for (i in data.timeTrend) {
            myLineChart.data.labels.push(data.timeTrend[i]);
            prevTimeStamp = data.timeTrend[i];
            //console.log("Time value: "+data.timeTrend[i]);
        }
        for (i in data.price) {
            myLineChart.data.datasets.forEach((dataset) => {
                //console.log("Price value: "+data.price[i]);
                dataset.data.push(data.price[i]);
            });
        }
        myLineChart.update();
    });

    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: temp.timeTrend,
        datasets: [{
          label: "Price",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(82, 140, 58, 0.5)",
          borderColor: "rgba(82, 140, 58, 0.5)",
          pointRadius: 0.2,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 1,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 2,
          pointBorderWidth: 1,
          borderWidth: 0.7,
          data: temp.price
        }],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10
                }
            },
            y: {
               ticks: {
                    maxTicksLimit: 10
                }
            }
        },
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        legend: {
          display: true
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 12,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 5,
          yPadding: 5,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10
        }
      }
    });
}

function populateMetaData() {
    const socket = new WebSocket('ws://' + location.host + '/price/' + stockVal);
    socket.addEventListener('message', ev => {
        id="currentPrice"
        data = JSON.parse(ev.data)
        document.getElementById('stockSymbol').innerHTML = data.stockSymbol
        document.getElementById('currentPrice').innerHTML = data.currentPrice
        document.getElementById('minPrice').innerHTML = data.minPrice
        document.getElementById('maxPrice').innerHTML = data.maxPrice
    });
}

function getSelectedStock() {
    if ($('#stockHid').val() == '') {
        stockVal = 'ABCBANK'
    } else {
        stockVal = $('#stockHid').val()
    }
    $('#stockSelector').val(stockVal)
    return stockVal;
}