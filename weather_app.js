var searchQuery;
var searchOption;
//TODO find a way to make the app work internationally.ie take in the name of the "search_region" and set that to location.
// add more icons for weather ie clouds only for cloudy
// update on github and download finished version
$(document).ready(function() {
  var data;
  $("#search_button").on("click", function() {
    searchWeather(
      document.getElementById("search_region").value,
      document.getElementById("search").value
    );
    $("#search_region").val("");
    $("#search").val("");
  });
  $("#search").keypress(function(e) {
    // enter key for searchbar
    if (e.which == 13) {
      searchWeather(
        document.getElementById("search_region").value,
        document.getElementById("search").value
      );
      $("#search_region").val("");
      $("#search").val("");
      //return false;
    }
  });

  $("#search_region").keypress(function(e) {
    // enter key for searchbar
    if (e.which == 13) {
      searchWeather(
        document.getElementById("search_region").value,
        document.getElementById("search").value
      );
      $("#search_region").val("");
      $("#search").val("");
      //return false;
    }
  });

  $("#local").on("click", function() {
    //document.getElementById("welcome").style.opacity = 0;
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
          "https://api.wunderground.com/api/9a9b15016576a31c/geolookup/conditions/q/autoip.json",
          function(data) {
            console.log(data);
            updateWeather(data);
          }
        );
      }
    }
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  });

  // $("#tempscale").click(switchScale(data));
});

function searchWeather(region, cityName) {
  // make JSON call to weather underground api based on a city typed in. The city could be spelled incorrectly, so if it is spelled incorrectly, have them reenter the city name.
 

  console.log(cityName);
    $.getJSON(
      "https://api.wunderground.com/api/9a9b15016576a31c/geolookup/conditions/q/" +
        region +
        "/" +
        cityName +
        ".json",
      function(json) {
        console.log(json);
        updateWeather(json);
      }
    );
  }

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
    $("#temp").text("Temperature " + this.temp + "°F");
  } else {
    this.temp -= 32;
    this.temp = this.temp * (5 / 9);
    this.temp = Math.round(this.temp * 100) / 100;
    $("#temp").text("Temperature " + this.temp + "°C");
  }
}
function updateTemp(json) {
  if (scale) {
    //Farenhiet
    temp = json.current_observation["temp_f"];
    $("#temp").html("Temperature " + temp + "°F");
  } else {
    temp = json.current_observation["temp_c"];
    $("#temp").html("Temperature " + temp + "°C");
  }
}
function getLocation(json) {
  //console.log(json);
  
  $("#location").text(json.location['city']);
}

function getTime(json) {
  var timeStr = json.current_observation["observation_time"];
  $("#time").text(timeStr);
}
function updateHumid(json) {
  var UV = json.current_observation["UV"];
  var humid = json.current_observation["relative_humidity"];

  $("#humid").text("Humidity: " + humid);
  $("#UV").text("UV index: " + UV);
}
function updateWeather(json, local) {
  document.getElementById("tempButton").style.opacity = "100";
  document.getElementById("weatherlink").style.opacity = "100";

  getTime(json);
  getLocation(json);
  updateHumid(json);
  updateTemp(json);
  // fix this to the api's specifications
  var weather = json.current_observation["weather"];
  console.log(weather);
  switch (weather) {
    case "Heavy Thuderstorm":
    case "Thunderstorm":
    case "Heavy Thunderstorms and Rain":
    case "Light Thunderstorms and Rain":
    case "Light Thunderstorm": {
    
 document.getElementById("cloudy").style.opacity ="0";     document.getElementById("thunder").style.opacity = "100";
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
    case "Rain":
    case "Light Rain":
    case "Heavy Rain": {
     document.getElementById("cloudy").style.opacity ="0";      document.getElementById("thunder").style.opacity = "0";
      document.getElementById("rainy").style.opacity = "100";
      document.getElementById("snow").style.opacity = "0";
      document.getElementById("sunny").style.opacity = "0";
      break;
    }
    case "Heavy Snow":
    case "Snow":
    case "Heavy Snow Grains":
    case "Light Snow Grains":
    case "Light Snow Showers":
    case "Heavy Snow Showers":
    case "Light Snow": {
      document.getElementById("cloudy").style.opacity ="0";     
      document.getElementById("thunder").style.opacity = "0";
      document.getElementById("rainy").style.opacity = "0";
      document.getElementById("snow").style.opacity = "100";
      document.getElementById("sunny").style.opacity = "0";
      break;
    }
    case "Overcast":
    case "Cloudy":
 document.getElementById("cloudy").style.opacity ="100";     
      document.getElementById("thunder").style.opacity = "0";
      document.getElementById("rainy").style.opacity = "0";
      document.getElementById("snow").style.opacity = "0";
      document.getElementById("sunny").style.opacity = "0";
      break;
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

    
}
