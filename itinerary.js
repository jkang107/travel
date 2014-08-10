
$(document).ready(function() {
  writeJsonFromServer();
});
//var jsonData;

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
  var mapWidth = browserWidth * 0.65;
  var mapHeight = mapWidth * 1.8/3;

  var mapLeft = ($("#worldMapStr").width() - mapWidth) / 2 - 22;

  $('#world-map').css({"width" : mapWidth, "height" : mapHeight, "left" : mapLeft});
}

//https://developer.flightstats.com/api-docs/flightstatus/v2/flight
function readJsonFromServer() {

  $.ajax({
    type: 'GET',
    url: "http://whispering-gorge-9163.herokuapp.com/read",
    //url: "http://localhost:5000/read",
    success: function(result) {
      createWorldMap(JSON.parse(result).selectedCountry);

      //getMyFlightList(JSON.parse(result).flights);
      draw(JSON.parse(result).countries);
      
      console.log(JSON.parse(result).flights);
      console.log(JSON.parse(result).countries);
    },
    error: function(a,b) {
      console.log("error: " + a + b);
    }
  });
}

function writeJsonFromServer() {

  $.ajax({
    //crossDomain:true,
    //dataType: "json",
    type: 'POST',
    url: "http://whispering-gorge-9163.herokuapp.com/write",
    //url: "http://localhost:5000/write",
    
    data: {
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
          "code":"KR",
          "country": "Departure!",
          "from":"2014/9/23"
        },
        {
          "code": "US",
          "country": "United State",
          "from": "2014/9/23",
          "to":"2014/10/1"
        },
        {
          "code": "PE",
          "country": "Peru",
          "from":"2014/10/1",
          "to":"2014/10/10"
        },
        {
          "code":"BO",
          "country": "Bolivia",
          "from":"2014/10/14",
          "to":"2014/11/10"
        },
        {
          "code":"CL",
          "country": "Chile",
          "from":"2014/11/11",
          "to":"2014/11/30"
        },
        {
          "code": "AR",
          "country": "Argentina",
          "from":"2014/11/30",
          "to": "2014/12/10"
        },
        {
          "code":"BR",
          "country": "Brazil",
          "from":"2014/12/10",
          "to":"2014/12/18"
        },
        {
          "code": "DE",
          "country": "Germany",
          "from":"2014/12/18",
          "to":"2014/12/25"
        },
        {
          "code":"AT",
          "country": "Austria",
          "from":"2014/12/25",
          "to":"2014/12/31"
        },
        {
          "code":"IT",
          "country": "Italy",
          "from":"2015/1/1",
          "to":"2015/1/30"
        },
        {
          "code": "HR",
          "country": "Croatia",
          "from":"2015/2/1",
          "to": "2015/2/12"
        },
        {
          "code":"TR",
          "country": "Turkey",
          "from":"2015/2/12",
          "to":"2015/3/1"
        },
        {
          "code":"KR",
          "country": "Arrival!",
          "from":"2015/3/1"
        }
      ]
    },
    dataType: "json",
    success: function(result) {
      console.log("post success");
      readJsonFromServer();
    },
    error: function(data, text) { 
      console.log("post error");
    }
  });
}


function getMyFlightList(data) {
  routeLength = data.length;

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

 /*$.ajaxPrefilter('json', function(options, orig, jqXHR) {
      return 'jsonp';
  });*/


  $.ajax({
    //crossDomain:true,
    //dataType: "json",
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

// http://suitcaseonthesofa.com/argentinian-chronicles-travel-tunes-itinerary/

var positionOfFirstRightLine = 0;
var positionOfRightCircle = 0;
var rightDirectionMaxNumber, leftDirectionMaxNumber;
var lengthOfHorizontalLine = 220;
var countR = 0;
var countL = 0;
var dataSize = 0;

function draw(data) {
  var screenDivWidth = $("#section2").width();
  var oneRouteWidth = 50 + 150;
  var maxNumber = 0;
  var tmpMaxNumber = 0;
  var isFirstLine = true;
  var prevLineR = 0;
  var prevLineL = 0;
  dataSize = data.length;

/*  var routeCount = 0;
  for(var i = 0; i< data.length; i++) {
    routeCount++;

    if(data[i].city != "undefined") {
      routeCount += data[i].city.length;
    }
  }
  
  dataSize = routeCount;*/

  for(var i = 1; i < dataSize; i++) {
    if((oneRouteWidth * i) + 55 + 55 > screenDivWidth) {
        maxNumber = i-1;

        positionOfRightCircle = maxNumber * oneRouteWidth;
        var marginRL = (screenDivWidth - ((oneRouteWidth * maxNumber) + 55)) / 2;
        /*if(marginRL < 50) {
          marginRL = 50;
        }*/
        $("#itinerary").css("margin", "80px " + marginRL + "px");
        positionOfFirstRightLine = screenDivWidth -(marginRL*2 + positionOfRightCircle);
        break;
    }
  }
  // https://www.iconfinder.com/icons/175097/airplane_takeoff_icon#size=64
  // icon finder

  $("#itinerary").append("<div id='plane' style='height:75px;'><img class='plane_img' src='./image/airplane_64.png'></div>");
  
  rightDirectionMaxNumber = maxNumber;
  leftDirectionMaxNumber = maxNumber*2;
  
  oneRoundRange = maxNumber*2;

  for(var i = 0; i < dataSize; i++) {
    var locationName;
    var isCity = false;
    if(data[i].city != undefined) {
      locationName = data[i].city;
      isCity = true;
    } else {
      locationName = data[i].country;
    }

    if(i < rightDirectionMaxNumber && i < leftDirectionMaxNumber) {
      //1. left - to - right

      // Draw circle
      drawCircle(i+1, "left_right", locationName, data[i].from, isCity);

      // Draw Line
      if(i+1 != dataSize) {
        drawLine(i+1, "left_right");
      }

    } else if(i == rightDirectionMaxNumber) {
      //2. right: top-down  

      // Draw Line
      drawLine(i+1, "right");
      if(i+1 == dataSize) {
        drawLine(i+1, "right_left");
        drawCircle(i+1, "right_left", locationName, data[i].from, isCity);
      } else {
        // Draw circle
        drawCircle(i+1, "right", locationName, data[i].from, isCity);
        
      }

    } else if(i > rightDirectionMaxNumber && i < leftDirectionMaxNumber){
      //3. right - to - left
      
      // Draw Line
      drawLine(i+1, "right_left");
      // Draw Circle
      drawCircle(i+1, "right_left", locationName, data[i].from, isCity);

    } else if(i == leftDirectionMaxNumber) {
      //4. left: top-down

      // Draw Line
      drawLine(i+1, "right_left");
      // Draw Line
      drawLine(i+1, "left");
      
      if(i+1 == dataSize) {
        // Last Route
        // Draw Line
        drawLine(i+1, "left_right");
        // Draw Circle
        drawCircle(i+1, "left_right", locationName, data[i].from, isCity);
      } else {
        // Draw Circle
        drawCircle(i+1, "left", locationName, data[i].from, isCity);
        // Draw Line
        drawLine(i+1, "left_right");
      }
      // update max value
      rightDirectionMaxNumber += oneRoundRange;
      leftDirectionMaxNumber += oneRoundRange;

      countR++;
      countL++;
    }
  }

  highlightRoute();
}

function drawCircle(num, direction, country, from, isCity) {
  var floatStyle;
  var topStyle = 0;
  var leftStyle = 0;
  var rightStyle = 0;

  if(direction == "right_left") {
    floatStyle = "right";

  } else if(direction == "left_right") {
    floatStyle = "left";

  } else if(direction == "right") {
    topStyle = -3 + lengthOfHorizontalLine/2 - 25;
    floatStyle = "right";

  } else {
    floatStyle = "left";  
    topStyle = -3 + lengthOfHorizontalLine/2 - 25;
  } 

  if(num > 7) {
    $("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle 
      + "px;'><div class='circle' style='width:50px; height:50px; background-color:yellow;'></div><span id='circle_" + num + "' class='circle_no' style='color:#4B4646;'>"
        + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
  } else {
    $("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle 
      + "px;'><div class='circle' style='width:50px; height:50px; background-color:red;'></div><span id='circle_" + num + "' class='circle_no'>"
        + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
  }

  /*if(num > 7) {
    $("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle 
      + "px;'><img class='circle' src='./image/circle2.png'><span id='circle_" + num + "' class='circle_no' style='color:#4B4646;'>"
        + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
  } else {
    $("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle 
      + "px;'><img class='circle' src='./image/circle.png'><span id='circle_" + num + "' class='circle_no'>"
        + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
  }*/
  
  
  if(direction == "right") {
    $("#route_" + num).css("right", "23px");
  } else if(direction == "left") {
    $("#route_" + num).css("left", "23px");
  }
}

function drawLine(num, direction) {
  if(direction == "left_right") {
    if(num == leftDirectionMaxNumber+1 || num == dataSize) {
      $("#itinerary").append("<div class='line_vertical_right' style='margin-left:55px;'></div>");
    } else {
      $("#itinerary").append("<div class='line_vertical_right'></div>");  
    }
    
  } else if(direction == "right_left") {
    if(num == rightDirectionMaxNumber+2 || (num == dataSize && rightDirectionMaxNumber+1 == dataSize)) {
      $("#itinerary").append("<div class='line_vertical_left' style='margin-right:"+ positionOfFirstRightLine + "px;'></div>");  
    } else {
      $("#itinerary").append("<div class='line_vertical_left'></div>");    
    }

  } else if(direction == "right") {
    var topStyle = -3 + $("#plane").height() + $(".circle_container").height() * countR * 2;
    $("#itinerary").append("<div class='line_horizontal_right' style='left:" + positionOfRightCircle + "px; top:" + topStyle + "px'></div>");

  } else if(direction == "left") {
    var topStyle = -3 + $("#plane").height() + $(".circle_container").height() * (countL*2 + 1);
    $("#itinerary").append("<div class='line_horizontal_left' style='top:" + topStyle + "px; left:20px;'></div>");
  }
}


function highlightRoute() { 
var num = 1; 
  setInterval(function() {
    if($("#circle_" + num).css("color") == "rgb(255, 255, 255)") {
      $("#circle_" + num).css("color", "blue");
    } else {
      $("#circle_" + num).css("color", "white");
    }    
  }, 1000);

}