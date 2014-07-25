var access_token;
var client_id = "0cd2081f6bcd4d0ca9ea6fd4834b4e05";

$(document).ready(function() {
  client_id = "0cd2081f6bcd4d0ca9ea6fd4834b4e05";
  //login()
  getUserPhotos();
  $("#zoom_photo").css("display", "none");

  $("body").click(function(e) {
    if (e.target.className == "photo-grid" || e.target.id == "menu") {
      $(".photo-grid").css("opacity", 1.0);
      if ($("#zoom_photo").css("display") != "none") {
        $("#zoom_photo").hide();
      }
    }
  });

  $("#addFlight").click(function(e) {
    //getFlightInfo($("#input_airline").val(), $("#input_flightNum").val(), $("#input_departureDate").val());
    getFlightInfo("OZ", "202", "2014/09/23");
  });

});

function login() {
  var redirect_uri = "http://10.186.120.167/jinah.kang/public_html/picasa/keyevent/instagram.html";

  var url = "https://instagram.com/oauth/authorize/?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=token";
  window.location.reload = url;
  access_token = window.location.hash.split("=")[1];
  console.log("access_token : " + access_token);
  return access_token;
}

function getUserPhotos() {
  var requestSelfUrl = "https://api.instagram.com/v1/users/self/feed?access_token=" + access_token + "&COUNT=5";

  //get user id from username
  // http://jelled.com/instagram/lookup-user-id

  var myUserId = "179519605"; //jkang107
  myUserId = "285866271" //배우 박수진
  //myUserId = "15882249" //타블로
  var requestUserUrl = "https://api.instagram.com/v1/users/" + myUserId + "/media/recent/?access_token=" + access_token;
  var requestPopularURL = "https://api.instagram.com/v1/media/popular?access_token=" + access_token;
  var userURL = "https://api.instagram.com/v1/users/" + myUserId + "/media/recent/?client_id=" + client_id;

  $.get(userURL, function(response) {
    var result = response;
    var numberOfPhoto = result.data.length;

    for (var i = 0; i < numberOfPhoto; i++) {
      var photo_standard = result.data[i].images.standard_resolution;
      var locationInfo = result.data[i].location;
      if(locationInfo) {
        latitude = locationInfo.latitude;
        longitude = locationInfo.longitude;
        
        //thumbnail info
        var photo_thumbnail = result.data[i].images.thumbnail;
        var thumb_url = photo_thumbnail.url;
        var thumb_widht = photo_thumbnail.width;
        var thumb_height = photo_thumbnail.height;
      }
      //var latitude = locationInfo.latitude;
      //var longitude = locationInfo.longitude
      $(".photo-grid").append("<li><a href='javascript:void(0)'><figure><img id = 'photo_" + i + "' class='photo' src='" + photo_standard.url + "' width='300' height='300'><figcaption></figcaption></figure></a></li>");
      $("#photo_" + i).attr("origin_width", photo_standard.width);
      $("#photo_" + i).attr("origin_height", photo_standard.height);
      $("#photo_" + i).attr("time", result.data[i].created_time.toHHMMSS());
      if (result.data[i].caption != null) {
        //$("#photo_" + i).attr("info", result.data[i].caption.text);
        $("#photo_" + i).siblings().append("<p>" + result.data[i].caption.text + "</p>");
      }
    }

    addClickEvent();
    //addHoverEvent();
  });
}

function addClickEvent() {
  $("figure").click(function(e) {
    if ($("#zoom_photo").css("display") == "none") {
      $("#zoom_photo").show();
    }
    var targetInfo = e.target.parentNode.parentNode.childNodes[0];
    $("#zoom_photo").attr("src", targetInfo.src);
    $("#zoom_photo").attr("width", targetInfo.attributes.origin_width.value);
    $("#zoom_photo").attr("height", targetInfo.attributes.origin_height.value);

    var photoLeftPos = (window.innerWidth - targetInfo.attributes.origin_width.value) / 2;
    $("#zoom_photo").css("left", photoLeftPos);

    var photoTopPos = (window.innerHeight - targetInfo.attributes.origin_height.value) / 2;
    $("#zoom_photo").css("top", photoTopPos);
    $(".photo-grid").css("opacity", "0.3");
  });
}

// function addHoverEvent() {
//   $("img").hover(function(e) {
//     if (e.target.attributes.info) {
//       //console.log(e.target.attributes.info.value);
//     }

//   });
// }

String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time = hours + ':' + minutes + ':' + seconds;
  return time;
}
