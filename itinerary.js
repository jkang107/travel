
$(document).ready(function() {
  //writeJsonFromServer();
});


//https://developer.flightstats.com/api-docs/flightstatus/v2/flight
function readJsonFromServer() {
  $.ajax({
    type: 'GET',
    url: "http://whispering-gorge-9163.herokuapp.com/read",
    success: function(result) {
      createWorldMap(JSON.parse(result).selectedCountry);
      getMyFlightList(JSON.parse(result).flights);
      
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