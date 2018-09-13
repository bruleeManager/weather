class Weather {

  /**
   * Making the network call to the yahoo network api
   * Return Promise
   */

  findWeatherInfo() {

    let query = this.creatQuery();

    return new Promise(function(resolve, reject) {
      $.get( query, function(data) {
        resolve(data)
      })
      .fail(function() {
        reject('search Failed');
      });
    });
  }

  /**
   * Generating the query for yahoo weather api
   * return String Query
   */

  creatQuery(){

    let city = $('#cityField input').val();
    let province = $('#provinceField input').val();
    return `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}, ${province}")&format=json`
  }
}
