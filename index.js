$(document).ready(function() {
  var data;
  if (navigator.geolocation) {
    //Return the user's longitude and latitude on page load using HTML5 geolocation API
    var currentPosition;

    function getCurrentLocation(position) {
      currentPosition = position;
      latitude = currentPosition.coords.latitude;
      //console.log(latitude);
      longitude = currentPosition.coords.longitude;
      //console.log(longitude);
      //AJAX request
      $.getJSON(
        "https://api.wunderground.com/api/9a9b15016576a31c/conditions/q/autoip.json",
        function(data) {
          //console.log(data);
          updateWeather(data);
        }
      );
    }
  }
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
  // $("#tempscale").click(switchScale(data));
});

var temp = 0;
var scale = true;
// add a get temp within the updateWeather function ALSO get the location too
function switchScale() {
  if (this.scale === true) {
    this.scale = false;
    $("#tempscale").text("F");
  } else {
    this.scale = true;
    $("#tempscale").text("C");
  }
  calcTemp(temp);
}
function calcTemp(temp) {
  if (this.scale == true) {
    this.temp = this.temp * (9 / 5) + 32;
    this.temp = Math.round(this.temp * 100) / 100;
    $("#temp").text("Current Temperature " + this.temp + "°F");
  } else {
    this.temp -= 32;
    this.temp = this.temp * (5 / 9);
    this.temp = Math.round(this.temp * 100) / 100;
    $("#temp").text("Current Temperature " + this.temp + "°C");
  }
}
function updateTemp(json) {
  if (scale) {
    //Farenhiet
    temp = json.current_observation["temp_f"];
    $("#temp").html("Current Temperature " + temp + "°F");
  } else {
    temp = json.current_observation["temp_c"];
    $("#temp").html("Current Temperature " + temp + "°C");
  }
}
function getLocation(json) {
  console.log(json);
  var url = json.current_observation['forecast_url'];
  var last = url.lastIndexOf("/");
  var temp = url.slice(last+1,url.length-5);
  var city = temp.replace("_"," ");
  $("#location").text(city);
}
function getTime(json) {
  var timeStr = json.current_observation['observation_time'];
$("#time").text(timeStr);
}
function updateWeather(json) {
  getTime(json);
  getLocation(json);
  updateTemp(json);
  // fix this to the api's specifications
  var weather = json.current_observation["weather"];
  console.log(weather);
  switch (weather) {
    case "Heavy Thuderstorm":
    case "Heavy Thunderstorms and Rain":
    case "Light Thunderstorms and Rain":
    case "Light Thunderstorm": {
      document.getElementById("thunder").style.opacity = "100";
      document.getElementById("rainy").style.opacity = "0";
      document.getElementById("snow").style.opacity = "0";
      document.getElementById("sunny").style.opacity = "0";
      break;
    }
    case "Light Drizzle":
    case "Heavy Drizzle":
    case "Light Rain Mist":
    case "Heavy Rain Mist":
    case "Light Rain Showers":
    case "Heavy Rain Showers":
    case "Light Rain":
    case "Heavy Rain": {
      document.getElementById("thunder").style.opacity = "0";
      document.getElementById("rainy").style.opacity = "100";
      document.getElementById("snow").style.opacity = "0";
      document.getElementById("sunny").style.opacity = "0";
      break;
    }
    case "Heavy Snow":
    case "Heavy Snow Grains":
    case "Light Snow Grains":
    case "Light Snow Showers":
    case "Heavy Snow Showers":
    case "Light Snow": {
      document.getElementById("thunder").style.opacity = "0";
      document.getElementById("rainy").style.opacity = "0";
      document.getElementById("snow").style.opacity = "100";
      document.getElementById("sunny").style.opacity = "0";
      break;
    }
    case "Overcast":
    case "Mostly Cloudy":
    case "Partly Cloudy":
    case "Scattered Clouds":
    case "Clear": {
      document.getElementById("thunder").style.opacity = "0";
      document.getElementById("rainy").style.opacity = "0";
      document.getElementById("snow").style.opacity = "0";
      document.getElementById("sunny").style.opacity = "100";
      break;
    }
  }
  /*
  if (json.observation_location == thunder) {
    //thunderstorm
    document.getElementById("thunder").style.opacity = "100";
    document.getElementById("rainy").style.opacity = "0";
    document.getElementById("snow").style.opacity = "0";
    document.getElementById("sunny").style.opacity = "0";
  } else if (json.weather== rainy) {
    //rain
    document.getElementById("thunder").style.opacity = "0";
    document.getElementById("rainy").style.opacity = "100";
    document.getElementById("snow").style.opacity = "0";
    document.getElementById("sunny").style.opacity = "0";
  } else if (json.weather == snow) {
    //snow
    document.getElementById("thunder").style.opacity = "0";
    document.getElementById("rainy").style.opacity = "0";
    document.getElementById("snow").style.opacity = "100";
    document.getElementById("sunny").style.opacity = "0";
  } else {
    //clear/cloud
    document.getElementById("thunder").style.opacity = "0";
    document.getElementById("rainy").style.opacity = "0";
    document.getElementById("snow").style.opacity = "0";
    document.getElementById("sunny").style.opacity = "100";
  }
  */
}