function set_weather(data) {
  $(".location .value").text(data.name + ", " + data.sys.country);

  $(".temp.celsius .value").text(Math.floor(data.main.temp));

  var fahrenheit = data.main.temp * 1.8 + 32;

  $(".temp.fahrenheit .value").text(Math.floor(fahrenheit) );

  $(".temp").addClass("animated");
  $(".weather-icon").addClass("animated");

  var icon_to_font = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-day-showers",
    "09n": "wi-night-alt-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-day-thunderstorm",
    "11n": "wi-night-alt-thunderstorm",
    "13d": "wi-day-snow",
    "13n": "wi-night-alt-snow",
    "50d": "wi-windy",
    "50n": "wi-windy"
  };

  var icon = data.weather[0].icon;
  var font_icon = icon_to_font[icon];

  $(".wi").attr("class", "wi " + font_icon);

  var description = data.weather[0].main;

  $(".weather-description").text(description);
}

function lat_lon_location(lat, lon) {
  var key = "2bc5677e833038c7c834f60caef3e3c3";
  var url =
    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURI(lat) +
    "&lon=" +
    encodeURI(lon) +
    "&units=metric&APPID=" +
    key +
    "&mode=json";
  return url;
}

function current_position(position) {
  var url = lat_lon_location(
    position.coords.latitude,
    position.coords.longitude
  );
  $.getJSON(url, set_weather);
}

$(document).ready(function() {
  $(".onoffswitch-checkbox").change(function() {
    $(".temp.fahrenheit").toggleClass("hidden");
    $(".temp.celsius").toggleClass("hidden");
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(current_position);
  } else {
    var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=2bc5677e833038c7c834f60caef3e3c3&mode=json"
    $.getJSON(url, set_weather);
  }
});
