
$(document).ready(function() {
  writeJsonFromServer();
});


function createWorldMap(selectedCountries) {
  var map = new jvm.WorldMap({
    container: $('#world-map'),
    map: 'world_mill_en',
    backgroundColor: '', 
    regionsSelectable: false,
        markersSelectable: true,
        markersSelectableOne: true,
        regionStyle: {
          hover: {
          "fill-opacity": 0.7
      },
          selected: {
          fill: '#F9998A'
      }
    },

        selectedRegions: selectedCountries,

        /*selectedMarkers: JSON.parse( window.localStorage.getItem('jvectormap-selected-markers') || '[]'),*/
        /*onMarkerLabelShow: function(event, label, index){
          label.html(label.html()+' (modified marker)');
        },
        onMarkerOver: function(event, index){
          console.log('marker-over', index);
        },
        onMarkerOut: function(event, index){
          console.log('marker-out', index);
        },
        onMarkerClick: function(event, index){
          console.log('marker-click', index);
        },
        onMarkerSelected: function(event, index, isSelected, selectedMarkers){
          console.log('marker-select', index, isSelected, selectedMarkers);
          if (window.localStorage) {
            window.localStorage.setItem(
              'jvectormap-selected-markers',
              JSON.stringify(selectedMarkers)
            );
          }
        },*/
        markers: [
          {latLng: [37.3, 127], name: 'Seoul'},
          {latLng: [34.5128266, -117.1064505], name: 'Los Angeles'},
          {latLng: [-11.922874, -77.022283], name: 'Lima'},
          {latLng: [-23.55, -46.63], name: 'Sao Paulo'},
          {latLng: [45.81, 15.98], name: 'Zagreb'},
          {latLng: [41, 28.5], name: 'Istanbul (2/2~ 2/10)'},
          {latLng: [41.4, 12.36], name: 'Rome'},
          {latLng: [-19.01, -65.26], name: 'Bolivia'},
          {latLng: [-33.408461, -70.677856], name: 'Chile'},
          {latLng: [-34.616842, -58.354506], name: 'Buenos Aires'},
          {latLng: [48.134522, 11.579258], name: 'Munich'},
          {latLng: [47.817451, 13.030509], name: 'Salzburg'}
      ],
        onRegionLabelShow: function(event, label, code){
          //label.html(label.html()+' (modified)');
          label.html();
        },
        onRegionOver: function(event, code){
          //console.log('region-over', code, map.getRegionName(code));
        },
        onRegionOut: function(event, code){
          //console.log('region-out', code);
        },
        onRegionClick: function(event, code){
          console.log('region-click', code);
          if($("#" + code).length > 0) {
            moveToPhotoSlide(code);
            event.stopPropagation();
          }
        },
        onRegionSelected: function(event, code, isSelected, selectedRegions){
          console.log('region-select', code, isSelected, selectedRegions);
          if (window.localStorage) {
            window.localStorage.setItem(
              'jvectormap-selected-regions',
              JSON.stringify(selectedRegions)
            );
          }
        },
        onViewportChange: function(e, scale, transX, transY){
            console.log('viewportChange', scale, transX, transY);
        }
  });

}
function setMapPosition() {
  var browserWidth = $(window).width();
  var mapWidth = browserWidth * 0.5;
  var mapHeight = mapWidth * 1.8/3;
  var mapLeft = ($("#worldMapStr").width() - mapWidth) / 2 - 22;

  $('#world-map').css({"width" : mapWidth, "height" : mapHeight, "left" : mapLeft});
}

//https://developer.flightstats.com/api-docs/flightstatus/v2/flight
function readJsonFromServer() {
  $.ajax({
    type: 'GET',
    url: "http://whispering-gorge-9163.herokuapp.com/read",
    success: function(result) {
      createWorldMap(JSON.parse(result).selectedCountry);
      //getMyFlightList(JSON.parse(result).flights);
      draw();
      
      console.log(JSON.parse(result).flights);
      console.log(JSON.parse(result).countries);
    }
  });
}

function writeJsonFromServer() {
  $.ajax({
    type: 'POST',
    url: "http://whispering-gorge-9163.herokuapp.com/write",
    
    data:
    {
      "flights": [
        {
          "code": "OZ",
          "number": "202",
          "date": "2014/09/23"
        },
        {
          "code": "CM",
          "number": "361",
          "date": "2014/10/1"
        },
        {
          "code": "CM",
          "number": "493",
          "date": "2014/10/1"
        },
        {
          "code": "LH",
          "number": "505",
          "date": "2014/10/17"
        },
        {
          "code": "OU",
          "number": "4437",
          "date": "2015/2/6"
        },
        {
          "code": "TK",
          "number": "1054",
          "date": "2015/2/18"
        },
        {
          "code": "OZ",
          "number": "552",
          "date": "2014/3/1"
        }
      ],
      "selectedCountry":["BO","BR","HR","PE","CL","DE","AT","US","TR","IT","AR"],
      "countries": [
        {
          "code": "US",
          "from": "2014/9/23",
          "to":"2014/10/1"
        },
        {
          "code": "PE",
          "from":"2014/10/1",
          "to":"2014/10/10"
        },
        {
          "code":"BO",
          "from":"2014/10/14",
          "to":"2014/11/10"
        },
        {
          "code":"CL",
          "from":"2014/11/11",
          "to":"2014/11/30"
        },
        {
          "code": "AR",
          "from":"2014/11/30",
          "to": "2014/12/10"
        },
        {
          "code":"BR",
          "from":"2014/12/10",
          "to":"2014/12/18"
        },
        {
          "code": "DE",
          "from":"2014/12/18",
          "to":"2014/12/25"
        },
        {
          "code":"AT",
          "from":"2014/12/25",
          "to":"2014/12/31"
        },
        {
          "code":"IT",
          "from":"2015/1/1",
          "to":"2015/1/30"
        },
        {
          "code": "HR",
          "from":"2015/2/1",
          "to": "2015/2/12"
        },
        {
          "code":"TR",
          "from":"2015/2/12",
          "to":"2015/3/1"
        }
      ]
    },
    dataType: "json",
    success: function(result) {
      console.log(JSON.parse(result).countries);
    }
  });
}

function getMyFlightList(data) {
  for(var i = 0; i < data.length; i++) {
    var tmpInfo = data[i];
    getFlightInfo(tmpInfo.code, tmpInfo.number, tmpInfo.date, i);
  }  
}

//var itin_number = 0;
function getFlightInfo(airlineCode, flightNumber, departureDate, itin_number) {
  var API_KEY = "5518caa213d5f1068aade0fa25662be5";
  var APP_ID = "9e6a56a1";

  if(airlineCode == "" || flightNumber == "" || departureDate == "") {
    return;
  }

  $("#itinerary").append("<div class='flightInfo' id='itinerary_" + itin_number + "'></div>");

  //It use when user enter the data in text field.
  /*var departureDateStr = departureDate.split("-")[0] + "/" + departureDate.split("-")[1] + "/" + departureDate.split("-")[2]; 
  departureDate = departureDateStr;*/

  var scheduleURL = "https://api.flightstats.com/flex/schedules/rest/v1/json/flight/" 
                  + airlineCode + "/" + flightNumber + "/departing/" + departureDate + 
                  "?appId=" + APP_ID + "&appKey=" + API_KEY;

  $.ajax({
    type: 'GET',
    url: scheduleURL,
    success: function(result) {
      console.log("good!");
      var responseData = result.scheduledFlights[0];

      var arrivalDate = responseData.arrivalTime.split("T")[0];
      var arrivalTime = responseData.arrivalTime.split("T")[1].split(":")[0] + ":" + responseData.arrivalTime.split("T")[1].split(":")[1];
      var terminalStr;
      if(responseData.arrivalTerminal != undefined) {
        terminalStr = responseData.arrivalTerminal;
      } else {
        terminalStr = "-";
      }

      var departureIndex = 1;
      var arrivalIndex = 0;

      if(result.appendix.airports[0].cityCode !=  responseData.arrivalAirportFsCode) {
        departureIndex = 0;
        arrivalIndex = 1;
      }

       var arrivalInfo = {
        airport: responseData.arrivalAirportFsCode,
        terminal: terminalStr,
        time: arrivalDate + " " + arrivalTime,
        country: result.appendix.airports[arrivalIndex].countryName,
        city: result.appendix.airports[arrivalIndex].city
      };

      var departureDate = responseData.departureTime.split("T")[0];
      var departureTime = responseData.departureTime.split("T")[1].split(":")[0] + ":" + responseData.departureTime.split("T")[1].split(":")[1];

      var departureInfo = {
        airport: responseData.departureAirportFsCode,
        time: departureDate + " " + departureTime,
        country: result.appendix.airports[departureIndex].countryName,
        city: result.appendix.airports[departureIndex].city
      };

      $("#itinerary_" + itin_number).append("<div class='departureInfo'>[ Departure ] <span class='country'>" + departureInfo.country + "</span><span class='city'>/" + departureInfo.city 
                                + "</span><p class='airportcode'>" + departureInfo.airport + "</p><p class='time'>" + departureInfo.time + "</p></div>");
      $("#itinerary_" + itin_number).append("<div class='arrivalInfo'>[ Arrival ] <span class='country'>" + arrivalInfo.country + "</span><span class='city'>/" + arrivalInfo.city 
                                + "</span><p class='airportcode'>" + arrivalInfo.airport + "</p><p class='time'>" + arrivalInfo.time + "</p><p class='terminal'>Terminal " + arrivalInfo.terminal + "</p></div>");
      
      console.log("[Arrival] AirportCode: " + arrivalInfo.airport + " / Terminal: " + arrivalInfo.terminal + " / Time: " + arrivalInfo.time);
      console.log("[Departure] AirportCode: " + departureInfo.airport + " / Time: " + departureInfo.time);
    },
    error: function(data,text) {
      console.log("bad");
    }
  });
}

function draw(){
  var c = document.getElementById("myCanvas");
  line(c);
  line(c);
  line(c);
  //circle(c, x, y);
}

var start_x = 70;
var start_y = 40;
var radius = 30;
var line_length = 60;

var country_color = '#8ED6FF';
var city_color = '#FFCCCC';

var circle_index = 1;

function line(c) {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(start_x-radius, start_y, radius, 0, 2*Math.PI);
  ctx.fillStyle = country_color;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.font = "40px Arial";
  ctx.textAlign = 'center';
  ctx.fillStyle = "black";
  ctx.fillText(circle_index, start_x-radius, start_y + (radius/2));
  circle_index++;
  ctx.stroke();
  //
  /*ctx.arc(30, 30, 15, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.font = "20px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText("1",24,37);*/
  //

  var ctx1 = c.getContext("2d");
  ctx1.beginPath();
  ctx.moveTo(start_x, start_y);
  start_x += line_length * 1.5;
  ctx1.lineTo(start_x, start_y);
  ctx1.lineWidth = 10;
  ctx1.stroke();
  start_x += radius*2;
  console.log("start_x: "+ start_x);
}