

$(document).ready(function() {

	$("#message_form").submit(function(e) {
		e.preventDefault();
         // tasks to do 
        if($("#responseMsg").length > 0) {
        	$("#responseMsg").remove();
        }
	    
	    var name = $(this).find('input[name="name"]').val();
	    //var email = $(this).find('input[name="email"]').val();
	    var msg = $(this).find('textarea[name="message"]').val();

	    if(name != '' && msg != '') {
	    	var url = "http://whispering-gorge-9163.herokuapp.com/sendMessage";
	    	//var url = "http://localhost:5000/sendMessage";

	    	var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var hh = today.getHours();
			var m = today.getMinutes();
			var ss = today.getSeconds();

			var currentTime = yyyy+"/"+mm+"/"+dd+" "+hh+":"+m+":"+ss;

	    	deferred = $.post(url, { name:name, message:msg, time:currentTime});

		    deferred.success(function (e) {

		        console.log("Message from server : " + e);
		        if($("#responseMsg").length == 0) {
		        	//$("header.body").append("<p id='responseMsg'>Thank you. <br/> I'll get back to you soon.</p>");
		        	$("header.body").append("<p id='responseMsg'>Your message has been sent.</p>");
		        	
		        }
		        $("input[name=name]").val("");
		        $("textarea[name=message]").val("");
		    });

		    deferred.error(function (e) {
		        // Handle any errors here.
		    });
	    }
   });
});