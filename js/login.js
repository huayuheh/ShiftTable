$(function(){
	$("#ab").on("click",function(){

		$("#ab").addClass("active");
		$("#ser").removeClass("active");
		$("#con").removeClass("active");
	});

	$("#ser").on("click",function(){

		$("#ser").addClass("active");
		$("#ab").removeClass("active");
		$("#con").removeClass("active");
	});

	$("#con").on("click",function(){

		$("#con").addClass("active");
		$("#ab").removeClass("active");
		$("#ser").removeClass("active");
	});


	if (typeof(Storage) !== "undefined") {
        localStorage.username = "";
    }

	Parse.$ = jQuery;
	Parse.initialize("hS3IWSgZKENFDTTbACS9JXC53QWDSyzAsmQ9I5Ez", "lgeS8H24S0GJa7bXdymfblJatLzFmA0TohBE1Www");
	$("#signInForm").on("submit",function(e){
		e.preventDefault();

		var data = $(this).serializeArray();
  	 	username = data[0].value;
  	 	password = data[1].value;
		
  	 	//console.log(username + password);

  	 	Parse.User.logIn(username, password, {
  	 		success: function(user){
  	 			localStorage.username = username;

       			window.location.replace("my_schedule2.html");
  	 		},
  	 		error: function(user,error){
  	 			if (error.code == 209) {    
				    Parse.User.logOut();
				    user.logIn(loginCallback);
				    return;
					}
  	 			$("#signinwarming").show().text("Wrong username or password");
  	 			console.log(error);
  	 		}
  	 	});
	});


	Parse.$ = jQuery;
	Parse.initialize("hS3IWSgZKENFDTTbACS9JXC53QWDSyzAsmQ9I5Ez", "lgeS8H24S0GJa7bXdymfblJatLzFmA0TohBE1Www");
	$("#signUpForm").on("submit",function(e){
		e.preventDefault();

		var data = $(this).serializeArray();
  	 	username = data[0].value;
  	 	email = data[1].value;
  	 	password = data[2].value;
  	 	console.log(username + email + password );
		
  	 	var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);

		// other fields can be set just like with Parse.Object
		user.signUp(null, {
		  success: function(user) {
		  	localStorage.username = username;
       			window.location.replace("my_schedule2.html");
		    // Hooray! Let them use the app now.
		  },
		  error: function(user, error) {


		    // Show the error message somewhere and let the user try again.
		    alert("Error: " + error.code + " " + error.message);
		  }
		});


	});




});