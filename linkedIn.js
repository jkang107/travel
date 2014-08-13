
var linkedin_api_key = "75eu60t3zhv71l";
var linkedin_secret_key = "3FSUc4mgqLebf1uP";


var oauthUrl = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code
                                           &client_id=" + linkedin_api_key + "
                                           &scope=" + linkedin_secret_key + "
                                           &state=" + "DCEEFWF45453sdffef424" + "
                                           &redirect_uri=http://jinah-travel.herokuapp.com";

$.ajax({
	type:'GET',
	url: oauthUrl,
	success: function() {

	}, error: function() {

	}
})