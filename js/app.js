$( document ).ready(function() {
    var WeahterApp = new Weather();
    findWeather(WeahterApp);

    //binding event
    $('#SearchWeather').click(()=>{findWeather(WeahterApp)});
});

/**
 * Grab the weather data and call drawChart if needed
 * @param {Object} Weather - Weather Object
 * return undefined
 */

function findWeather(WeahterApp){
  var weatherSearch = WeahterApp.findWeatherInfo();
  weatherSearch.then((data)=>{

      //handling failed

      if( data.query.results === null){
        alert('no results')
        return
      }

      // if results found
      let forecast = data.query.results.channel.item.forecast;
      let chartTitle = data.query.results.channel.item.title;
      let date =  forecast.map((forecast)=>{ return forecast.date});
      let high  = forecast.map((forecast)=>{ return forecast.high});
      let low  = forecast.map((forecast)=>{ return forecast.low});

      let chartData = {
        labels :  date,
        datasets: [
          {
              data: high,
              label: "High",
              borderColor: "#3e95cd",
              fill: false
          },
          {
              data: low,
              label: "Low",
              borderColor: "#3e95cd",
              fill: false
          }
        ], options: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        }
      }

      drawChart(chartData);
    });
}

/**
 * Grab the weather data and call drawChart if needed
 * @param {Object} Data - data object for the Chartjs to know what to drawChart
  * return undefined
*/

function drawChart(data) {

  var element = document.getElementById("myChart").getContext('2d');;
  var myChart =  new Chart(element, {
    type: 'line',
    data: data
  });
}
