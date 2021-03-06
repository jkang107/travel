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
		 markers: [{
		 	latLng: [35.90, 127.76],
		 	name: "I'm here! (Korea)"
		 }],
		
		onRegionLabelShow: function(event, label, code) {
			//label.html(label.html()+' (modified)');
			label.html();
		},
		onRegionOver: function(event, code) {
			//console.log('region-over', code, map.getRegionName(code));
		},
		onRegionOut: function(event, code) {
			//console.log('region-out', code);
		},
		onRegionClick: function(event, code) {
			console.log('region-click', code);
			if ($("#" + code).length > 0) {
				moveToPhotoSlide(code);
				event.stopPropagation();
			}
		},
		onRegionSelected: function(event, code, isSelected, selectedRegions) {
			console.log('region-select', code, isSelected, selectedRegions);
			if (window.localStorage) {
				window.localStorage.setItem(
					'jvectormap-selected-regions',
					JSON.stringify(selectedRegions)
				);
			}
		},
		onViewportChange: function(e, scale, transX, transY) {
			//console.log('viewportChange', scale, transX, transY);
		}
	});

}

function setMapPosition() {
	var mapWidth, mapHeight;

	if (innerWidth > innerHeight) {
		mapWidth = innerWidth * 0.55;
		mapHeight = innerHeight * 0.55;
	} else {
		mapWidth = innerWidth * 0.65;
		mapHeight = innerHeight * 0.45;
	}

	var mapLeft = ($("#worldMapStr").width() - mapWidth) / 2;

	$('#world-map').css({
		"width": mapWidth,
		"height": mapHeight,
		"left": mapLeft
	});
}

var countryJSON;
//https://developer.flightstats.com/api-docs/flightstatus/v2/flight
function readJsonFromServer() {

	$.ajax({
		type: 'GET',
		url: "http://whispering-gorge-9163.herokuapp.com/read",
		//url: "http://localhost:5000/read",
		success: function(result) {
			createWorldMap(JSON.parse(result).selectedCountry);

			//getMyFlightList(JSON.parse(result).flights);
			countryJSON = JSON.parse(result).countries;
			draw(countryJSON);

			//console.log(JSON.parse(result).flights);
			//console.log(JSON.parse(result).countries);
		},
		error: function(a, b) {
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
			// "flights": [{
			// 	"code": "OZ",
			// 	"number": "202",
			// 	"date": "2014/09/23"
			// }, {
			// 	"code": "CM",
			// 	"number": "361",
			// 	"date": "2014/10/1"
			// }, {
			// 	"code": "CM",
			// 	"number": "493",
			// 	"date": "2014/10/1"
			// }, {
			// 	"code": "LH",
			// 	"number": "505",
			// 	"date": "2014/10/17"
			// }, {
			// 	"code": "OU",
			// 	"number": "4437",
			// 	"date": "2015/2/6"
			// }, {
			// 	"code": "TK",
			// 	"number": "1054",
			// 	"date": "2015/2/18"
			// }, {
			// 	"code": "OZ",
			// 	"number": "552",
			// 	"date": "2014/3/1"
			// }],
			"selectedCountry": ["BO", "BR", "HR", "PE", "CL", "DE", "AT", "US", "TR", "AR"],
			"countries": [{
				"code": "KR",
				"country": "Departure!",
				"from": "2014/9/23"
			}, {
				"code": "US",
				"country": "United State",
				"from": "2014/9/23",
				"to": "2014/10/1",
				"cities": [{
					"name": "San Francisco",
					"from": "2014/9/23",
					"to": "2014/9/26",
					"traffic": "plane",
					"play" : "Pier 39 / Fisherman's wharf / Lombard Street / Cable Car",
					"sleep" : "Green tortoise hostel/3"
				}, {
					"name": "Los Angeles",
					"from": "2014/9/26",
					"to": "2014/10/1",
					"traffic": "bus",
					"play": "Universal Studios / Hollywood",
					"sleep" : "하모니 하우스/1"
				}]
			}, {
				"code": "PE",
				"country": "Peru(1)",
				"from": "2014/10/1",
				"to": "2014/10/10",
				"cities": [{
					"name": "Lima",
					"from": "2014/10/1",
					"to": "2014/10/2",
					"traffic": "plane",
					"play": "",
					"sleep":"포비네/3"
				}, {
					"name": "Huaraz",
					"from": "2014/10/2",
					"to": "2014/10/8",
					"play": "69 Lake / Pastoruri Glacier",
					"sleep":"Akilpo/5"
				},{
					"name": "Huacachina",
					"from": "2014/10/9",
					"to": "2014/10/10",
					"play": "Buggy car tour",
					"sleep":"Casa de Arena/3"
				}, {
					"name": "Cusco",
					"from": "2014/10/11",
					"to": "2014/10/16",
					"traffic": "plane",
					"play": "Plaza De Armas / 12 Angle Stone",
					"sleep":"El Puma/4"
				}, {
					"name": "Machu Picchu",
					"from": "2014/10/16",
					"to": "2014/10/17",
					"traffic": "train",
					"play": "Machu Picchu / Huayna Picchu",
					"sleep":"Angle Hostel/3"
				}]
			}, {
				"code": "BO",
				"country": "Bolivia",
				"from": "2014/10/18",
				"to": "2014/10/28",
				"cities": [{
					"name": "Copacabana",
					"from": "2014/10/18",
					"to": "2014/10/19",
					"play": "Isla del Sol",
					"sleep":"Inki Kala/4"
				}, {
					"name": "La Paz",
					"from": "2014/10/20",
					"to": "2014/10/21",
					"play": "Death Road",
					"sleep":"Pirwa Hostel/3"
				}, {
					"name": "Sucre",
					"from": "2014/10/22",
					"to": "2014/10/25",
					"play": "FOOD FOOD FOOD",
					"sleep":"Pachamama Hostel/4"
				}, {
					"name": "Uyuni Salt Flat",
					"from": "2014/10/25",
					"to": "2014/10/28",
					"play": "Uyuni Salt Flat Sunrise & Sunset",
					"sleep":"Hotel Avenida/4"
				}]
			}, {
				"code": "CL",
				"country": "Chile(1)",
				"from": "2014/10/28",
				"to": "2014/10/30",
				"cities": [{
					"name": "San Pedro de Atacama",
					"from": "2014/10/28",
					"to": "2014/10/30",
					"play": "Valle de la Luna",
					"sleep":"Intipara hostel/4"
				}]
			}, {
				"code": "AR",
				"country": "Argentina(1)",
				"from": "2014/10/30",
				"to": "2014/11/7",
				"cities": [{
					"name": "Jujuy",
					"from": "2014/10/30",
					"to": "2014/11/3",
					"play": "Purmamarca(Cerro de los 7 Colores) / Tilcara",
					"sleep":"Club Hostel/4"
				}, {
					"name": "Salta",
					"from": "2014/11/3",
					"to": "2014/11/6",
					"play": "Cafayate Tour",
					"sleep":"La Corvacha Hostel/4"
				}, {
					"name": "Mendoza",
					"from": "2014/11/7",
					"to": "2014/11/8",
					"play": "Wine Tour",
					"sleep":"Hostel independencia/3"
				}]
			}, {
				"code": "CL",
				"country": "Chile(2)",
				"from": "2014/11/8",
				"to": "2014/11/24",
				"cities": [{
					"name": "Santiago",
					"from": "2014/11/8",
					"to": "2014/11/10",
					"play": "볼거없음",
					"sleep":"Hostel Backpackers/3"
				}, {
					"name": "Pucón",
					"from": "2014/11/11",
					"to": "2014/11/14",
					"play": "Volcan Villarrica / Hydro Speed",
					"sleep":"ChiliKiwi/4"
				}]
			}, {
				"code": "AR",
				"country": "Argentina(2)",
				"from": "2014/11/13",
				"to": "2014/12/10",
				"cities": [
				{
					"name": "Bariloche",
					"from": "2014/11/13",
					"to": "2014/11/16",
					"play": "",
					"sleep":"Penthouse 1004/4"
				}, {
					"name": "El Calafate",
					"from": "2014/11/17",
					"to": "2014/11/19",
					"play": "Moreno Glacier",
					"sleep":"Mochilero/3"
				}]
			}, {
				"code": "CL",
				"country": "Chile(3)",
				"from": "2014/11/20",
				"to": "2014/11/25",
				"cities": [{
					"name": "Puerto Natales",
					"from": "2014/11/20",
					"to": "2014/11/21",
					"play": "",
					"sleep":"Kaweskar/4"
				},{
					"name": "Torres del Paine",
					"from": "2014/11/21",
					"to": "2014/11/24",
					"play": "W Trakking",
					"sleep":"Refugio"
				}]
			}, {
				"code": "AR",
				"country": "Argentina(3)",
				"from": "2014/11/25",
				"to": "2014/12/9",
				"cities": [
				{
					"name": "El Calafate",
					"from": "2014/11/25",
					"to": "2014/11/29",
					"play": "Moreno Glacier",
					"sleep":"Mochilero/3"
				}, {
					"name": "Buenos Aires",
					"from": "2014/11/29",
					"to": "2014/12/6",
					"traffic": "plane",
					"play": "",
					"sleep":"삼촌네/4"
				},{
					"name": "Iguazu",
					"from": "2014/12/7",
					"to": "2014/12/9",
					"play": "",
					"sleep":""
				}]
			},{
				"code": "PE",
				"country": "Peru(2)",
				"from": "2014/12/9",
				"to": "2015/2/4",
				"cities": [{
					"name": "Lima",
					"from": "2014/12/9",
					"to": "2014/12/10",
					"traffic": "plane",
					"play": "",
					"sleep":""
				}, {
					"name": "Huaraz",
					"from": "2014/12/11",
					"to": "2014/2/4",
					"play": "Churup/Laguna Willcacocha/Chavin",
					"sleep":"Akilpo/5"
				}]
			}, {
				"code": "BR",
				"country": "Brazil",
				"from": "2015/2/4",
				"to": "2015/2/8",
				"cities": [{
					"name": "Rio de Janeiro",
					"from": "2015/2/4",
					"to": "2015/2/6",
					"traffic": "plane",
					"play": "Corcovado/Copacabana beach",
					"sleep":"Refugio Hostel/3"
				}, {
					"name": "São Paulo",
					"from": "2015/2/7",
					"to": "2015/2/8",
					"play": "",
					"sleep":""
				}]
			}, {
				"code": "DE",
				"country": "Germany",
				"from": "2015/2/8",
				"to": "2015/2/15",
				"cities": [{
					"name": "München",
					"from": "2015/2/9",
					"to": "2015/2/10",
					"traffic": "plane",
					"play": "",
					"sleep":"MEININGER Hotel/3"
				}, {
					"name": "Fussen",
					"from": "2015/2/10",
					"to": "2015/2/10",
					"traffic": "train",
					"play": "Neuschwanstein Castle",
					"sleep":""
				}]
			}, {
				"code": "AT",
				"country": "Austria",
				"from": "2015/2/11",
				"to": "2015/2/14",
				"cities": [{
					"name": "Salzburg",
					"from": "2015/2/11",
					"to": "2015/2/13",
					"play": "Mirabell Palace/Salzburg Cathedral",
					"sleep":"Yoho Hostel/4"
				}, {
					"name": "Hallstatt",
					"from": "2015/2/13",
					"to": "2015/2/14",
					"play": "",
					"sleep":"Seehotel Grüner Baum/4"
				}]
			}, {
				"code": "HR",
				"country": "Croatia",
				"from": "2015/2/15",
				"to": "2015/2/24",
				"cities": [{
					"name": "Zagreb",
					"from": "2015/2/15",
					"to": "2015/2/16",
					"traffic": "plane",
					"play": "",
					"sleep":"Hostel Sara/4"
				}, {
					"name": "Split",
					"from": "2015/2/16",
					"to": "2015/2/20",
					"play": "",
					"sleep":"SleepinnSplit/5"
				}, {
					"name": "Dubrovnik",
					"from": "2015/2/20",
					"to": "2015/2/24",
					"play": "",
					"sleep":"Room PlaceForYou/3"
				}]
			}, {
				"code": "TR",
				"country": "Turkey",
				"from": "2015/2/24",
				"to": "2015/3/10",
				"cities": [{
					"name": "Cappadocia",
					"from": "2015/2/24",
					"to": "2015/2/27",
					"traffic": "plane",
					"play": "Balloon Tour",
					"sleep":"Garden Cave Hotel/4"
				}, {
					"name": "Pamukkale",
					"from": "2015/2/28",
					"to": "2015/2/28",
					"play": "Pamukkale",
					"sleep":""
				},{
					"name": "Fethiye",
					"from": "2015/2/28",
					"to": "2015/3/4",
					"play": "Paragliding / Ölüdeniz Beach",
					"sleep":"Caretta apart/3"
				}, {
					"name": "Istanbul",
					"from": "2015/3/4",
					"to": "2015/3/10",
					"traffic": "plane",
					"play": "Sultan Ahmed Mosque / Ayasofya / Dolmabahce Palace",
					"sleep":"Ottomarin/4"
				}]
			}, {
				"code": "KR",
				"country": "Arrival!",
				"from": "2015/3/11"
			}]
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

	for (var i = 0; i < data.length; i++) {
		var tmpInfo = data[i];
		getFlightInfo(tmpInfo.code, tmpInfo.number, tmpInfo.date, i);
	}
}

//var itin_number = 0;
function getFlightInfo(airlineCode, flightNumber, departureDate, itin_number) {
	var API_KEY = "5518caa213d5f1068aade0fa25662be5";
	var APP_ID = "9e6a56a1";

	if (airlineCode == "" || flightNumber == "" || departureDate == "") {
		return;
	}

	$("#itinerary").append("<div class='flightInfo' id='itinerary_" + itin_number + "'></div>");

	//It use when user enter the data in text field.
	/*var departureDateStr = departureDate.split("-")[0] + "/" + departureDate.split("-")[1] + "/" + departureDate.split("-")[2]; 
  departureDate = departureDateStr;*/

	var scheduleURL = "https://api.flightstats.com/flex/schedules/rest/v1/json/flight/" + airlineCode + "/" + flightNumber + "/departing/" + departureDate +
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
			if (responseData.arrivalTerminal != undefined) {
				terminalStr = responseData.arrivalTerminal;
			} else {
				terminalStr = "-";
			}

			var departureIndex = 1;
			var arrivalIndex = 0;

			if (result.appendix.airports[0].cityCode != responseData.arrivalAirportFsCode) {
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

			$("#itinerary_" + itin_number).append("<div class='departureInfo'>[ Departure ] <span class='country'>" + departureInfo.country + "</span><span class='city'>/" + departureInfo.city + "</span><p class='airportcode'>" + departureInfo.airport + "</p><p class='time'>" + departureInfo.time + "</p></div>");
			$("#itinerary_" + itin_number).append("<div class='arrivalInfo'>[ Arrival ] <span class='country'>" + arrivalInfo.country + "</span><span class='city'>/" + arrivalInfo.city + "</span><p class='airportcode'>" + arrivalInfo.airport + "</p><p class='time'>" + arrivalInfo.time + "</p><p class='terminal'>Terminal " + arrivalInfo.terminal + "</p></div>");

			console.log("[Arrival] AirportCode: " + arrivalInfo.airport + " / Terminal: " + arrivalInfo.terminal + " / Time: " + arrivalInfo.time);
			console.log("[Departure] AirportCode: " + departureInfo.airport + " / Time: " + departureInfo.time);
		},
		error: function(data, text) {
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

	for (var i = 1; i < dataSize; i++) {
		if ((oneRouteWidth * i) + 55 + 55 > screenDivWidth) {
			maxNumber = i - 1;

			positionOfRightCircle = maxNumber * oneRouteWidth;
			var marginRL = (screenDivWidth - ((oneRouteWidth * maxNumber) + 55)) / 2;

			$("#itinerary").css("margin", "80px " + marginRL + "px");
			positionOfFirstRightLine = screenDivWidth - (marginRL * 2 + positionOfRightCircle);
			break;
		}
	}
	// https://www.iconfinder.com/icons/175097/airplane_takeoff_icon#size=64
	// icon finder

	$("#itinerary").append("<div id='plane' style='height:75px;'><img class='plane_img' src='./image/airplane_64.png'></div>");

	rightDirectionMaxNumber = maxNumber;
	leftDirectionMaxNumber = maxNumber * 2;

	oneRoundRange = maxNumber * 2;

	for (var i = 0; i < dataSize; i++) {
		var locationName;
		var isCity = false;
		if (data[i].city != undefined) {
			locationName = data[i].city;
			isCity = true;
		} else {
			locationName = data[i].country;
		}

		if (i < rightDirectionMaxNumber && i < leftDirectionMaxNumber) {
			//1. left - to - right

			// Draw circle
			drawCircle(i + 1, "left_right", locationName, data[i].from, isCity);

			// Draw Line
			if (i + 1 != dataSize) {
				drawLine(i + 1, "left_right");
			}

		} else if (i == rightDirectionMaxNumber) {
			//2. right: top-down  

			// Draw Line
			drawLine(i + 1, "right");
			if (i + 1 == dataSize) {
				drawLine(i + 1, "right_left");
				drawCircle(i + 1, "right_left", locationName, data[i].from, isCity);
			} else {
				// Draw circle
				drawCircle(i + 1, "right", locationName, data[i].from, isCity);

			}

		} else if (i > rightDirectionMaxNumber && i < leftDirectionMaxNumber) {
			//3. right - to - left

			// Draw Line
			drawLine(i + 1, "right_left");
			// Draw Circle
			drawCircle(i + 1, "right_left", locationName, data[i].from, isCity);

		} else if (i == leftDirectionMaxNumber) {
			//4. left: top-down

			// Draw Line
			drawLine(i + 1, "right_left");
			// Draw Line
			drawLine(i + 1, "left");

			if (i + 1 == dataSize) {
				// Last Route
				// Draw Line
				drawLine(i + 1, "left_right");
				// Draw Circle
				drawCircle(i + 1, "left_right", locationName, data[i].from, isCity);
			} else {
				// Draw Circle
				drawCircle(i + 1, "left", locationName, data[i].from, isCity);
				// Draw Line
				drawLine(i + 1, "left_right");
			}
			// update max value
			rightDirectionMaxNumber += oneRoundRange;
			leftDirectionMaxNumber += oneRoundRange;

			countR++;
			countL++;
		}
	}

	highlightRoute();
	mouseEventHandler();
}

function drawCircle(num, direction, country, from, isCity) {
	var floatStyle;
	var topStyle = 0;
	var leftStyle = 0;
	var rightStyle = 0;

	if (direction == "right_left") {
		floatStyle = "right";

	} else if (direction == "left_right") {
		floatStyle = "left";

	} else if (direction == "right") {
		topStyle = -3 + lengthOfHorizontalLine / 2 - 25;
		floatStyle = "right";

	} else {
		floatStyle = "left";
		topStyle = -3 + lengthOfHorizontalLine / 2 - 25;
	}


	if (num > 12) {
		if (num == dataSize) {
			//black
			$("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle + "px;'><div class='circle' style='width:50px; height:50px; background-color:#07314A;'></div><span id='circle_" + num + "' class='circle_no' style='color:white;'>" + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
		} else {
			//yellow
			$("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle + "px;'><div class='circle' style='width:50px; height:50px; background-color:#E7CA52;'></div><span id='circle_" + num + "' class='circle_no' style='color:#4B4646;'>" + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
		}
	} else {
		if (num == 1) {
			//red
			$("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle + "px;'><div class='circle' style='width:50px; height:50px; background-color:#DD6D64;'></div><span id='circle_" + num + "' class='circle_no' style='color:#4B4646;'>" + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
		} else {
			//green
			$("#itinerary").append("<div id='route_" + num + "' class='circle_container' style='float:" + floatStyle + "; top:" + topStyle + "px;'><div class='circle' style='width:50px; height:50px; background-color:#A5CDB3;'></div><span id='circle_" + num + "' class='circle_no' style='color:#4B4646;'>" + num + "</span><div class='route_info'><div class='code'>" + country + "</div><div class='from'>" + from + "</div></div></div>");
		}
	}

	if (direction == "right") {
		$("#route_" + num).css("right", "23px");
	} else if (direction == "left") {
		$("#route_" + num).css("left", "23px");
	}
}

function drawLine(num, direction) {
	if (direction == "left_right") {
		if (num == leftDirectionMaxNumber + 1 || num == dataSize) {
			$("#itinerary").append("<div class='line_vertical_right' style='margin-left:55px;'></div>");
		} else {
			$("#itinerary").append("<div class='line_vertical_right'></div>");
		}

	} else if (direction == "right_left") {
		if (num == rightDirectionMaxNumber + 2 || (num == dataSize && rightDirectionMaxNumber + 1 == dataSize)) {
			$("#itinerary").append("<div class='line_vertical_left' style='margin-right:" + positionOfFirstRightLine + "px;'></div>");
		} else {
			$("#itinerary").append("<div class='line_vertical_left'></div>");
		}

	} else if (direction == "right") {
		var topStyle = -3 + $("#plane").height() + $(".circle_container").height() * countR * 2;
		$("#itinerary").append("<div class='line_horizontal_right' style='left:" + positionOfRightCircle + "px; top:" + topStyle + "px'></div>");

	} else if (direction == "left") {
		var topStyle = -3 + $("#plane").height() + $(".circle_container").height() * (countL * 2 + 1);
		$("#itinerary").append("<div class='line_horizontal_left' style='top:" + topStyle + "px; left:20px;'></div>");
	}
}


function highlightRoute() {
	var num = 17;
	setInterval(function() {
		if ($("#circle_" + num).css("color") == "rgb(255, 255, 255)") {
			$("#circle_" + num).css("color", "#4B4646");
		} else {
			$("#circle_" + num).css("color", "white");
		}
	}, 1000);

}

var origin_circle_color, hover_circle_color;


function mouseEventHandler(e) {
	$('.circle_no').mouseover(function(event) {
		origin_circle_color = $("#" + event.target.id).siblings(".circle").css("background-color");
		switch (origin_circle_color) {
			case "rgb(221, 109, 100)":
				//red
				hover_circle_color = "rgb(219,170,167)";
				break;
			case "rgb(165, 205, 179)":
				// green
				hover_circle_color = "rgb(205,249,221)";
				break;
			case "rgb(231, 202, 82)":
				//yellow
				hover_circle_color = "rgb(250,231,152)";
				break;
			case "rgb(7, 49, 74)":
				//black
				hover_circle_color = "rgb(67,104,125)";
				break;
		}
		$("#" + event.target.id).siblings(".circle").css("background-color", hover_circle_color);
	}).mouseout(function(event) {
		$("#" + event.target.id).siblings(".circle").css("background-color", origin_circle_color);
	});

	$('.circle_no').click(function(e) {
		var clickedCountry = $("#" + e.target.id).siblings(".route_info").children(".code").text();
		if (hasCityInfo(clickedCountry) === true) {
			showDetailInfo(clickedCountry);
		}
		return false;
	});

	$(".close_img").click(function(e) {
		//$(".photo-grid").css("opacity", 1.0);
		if ($("#zoom_photo_container").css("display") != "none") {
      hideZoomContainer();
		} else if ($("#detailInfo").css("display") == "block") {
			$("#detailInfo").css("display", "none");
			$(".detail_container").remove();
		}
		return false;
	});
}

var selectedCountry;

function hasCityInfo(countryName) {
	for (var i = 0; i < countryJSON.length; i++) {
		if (countryJSON[i].country === countryName && countryJSON[i].cities !== undefined) {
			selectedCountry = JSON.stringify(countryJSON[i].cities);
			return true;
		}
	}
	return false;
}

function showDetailInfo() {
	var data = JSON.parse(selectedCountry);
	if ($("#detailInfo").css("display") == "none") {
		var detailHeight = innerHeight - 130;
		var detailWidth = innerWidth - 150;
		var marginLR = ($("#section2").width() - detailWidth) / 2;
		var marginTB = (innerHeight - 40 - detailHeight) / 2;
		$("#detailInfo").css({
			"display": "block",
			"height": detailHeight,
			"width": detailWidth,
			"margin": marginTB + "px " + marginLR + "px"
		});
	}

	var numberOfCity = data.length;

	for (var i = 0; i < numberOfCity; i++) {
		$("#detailInfo").append("<div id='detail_" + i + "'  class='detail_container'><div class='cityName'></div></div>");
		$("#detail_" + i).children(".cityName").text(data[i].name);
		$("#detail_" + i).css("width", ($("#detailInfo").width() - 20 * numberOfCity - 64 - 30) / numberOfCity);
		$("#detail_" + i).css("height", $("#detailInfo").height() - 60);

		var contentHeight = ($(".detail_container").height() - $(".cityName").height() - parseInt($(".cityName").css("margin-top")) * 2) / 3;
		var traffic_img;
		switch (data[i].traffic) {
			case "train":
				traffic_img = 'train20.png';
				break;
			case "plane":
				traffic_img = 'airplane_64.png';
				break;
			case "bus":
			default:
				traffic_img = 'bus.png';
				break;
		}
		$("#detail_" + i).append("<div class='cityContent traffic' style='height:" + (contentHeight - 10) + "px'><img class='titleImg' src='./image/black_flat_icons/" + traffic_img + "'><div class='term'>" + data[i].from.substring(5) + " ~ " + data[i].to.substring(5) + "</div></div>");
		$("#detail_" + i).append("<div class='cityContent attraction' style='height:" + (contentHeight + 20) + "px'><img class='titleImg' src='./image/black_flat_icons/map_64.png'><div class='term'>" + data[i].play + "</div></div>");
		var appendStar = "";
		if(data[i].sleep.split("/")[0]) {
			var starNum = data[i].sleep.split("/")[1];
			
			for(var j = 0; j < starNum; j++) {
				appendStar += "<img class='hostelScore' src='./image/star16.png'>";
			}
		}
		$("#detail_" + i).append("<div class='cityContent accommodation' style='height:" + (contentHeight - 10) + "px'><img class='titleImg' src='./image/black_flat_icons/hotel_64.png'><div><span class='term hostel_name'>" + data[i].sleep.split("/")[0] + "</span>" + appendStar + "</div></div>");

		//getWeatherInfo(data[i].name);
	}
}


//http://www.flaticon.com/free-icons/travel_123