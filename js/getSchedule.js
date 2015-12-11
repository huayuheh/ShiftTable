var username = localStorage.username;
var busyTime =[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

var weekList=["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];


function busyTimes(week,time){
      day = parseInt(week);
      startTime = parseInt(time);
      continues = 1;

    var NewTime = Parse.Object.extend("time_table");
    var newTime = new NewTime();

    newTime.set("username", username);
    newTime.set("class_name", "busy");
    newTime.set("week", day);
    newTime.set("start_time", startTime);
    newTime.set("time_row", continues);
    newTime.save(null, {
      success: function(newTime) {
        window.location.replace("my_schedule2.html");

      },
      error: function(newTime, error) {
          console.log(error);
      }
    });
}









$(function() {


if(username!=""){

  $("button").click(function (){
    $(this).parents(".button").toggleClass('clicked');

    });



  $("#username").text(username);
  $("#username_big").text(username);
  $("#userPhoto").src = localStorage.photoUrl;





Parse.initialize("hS3IWSgZKENFDTTbACS9JXC53QWDSyzAsmQ9I5Ez", "lgeS8H24S0GJa7bXdymfblJatLzFmA0TohBE1Www");

 var user = new Parse.Query(Parse.User);
          user.equalTo("username", username);
        // find all the women
        user.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
                      var test = object.get('photo')._url;
              console.log(test);
              
                  (function($) {
            $(".face").html(
      
              (object.get('photo'))?
              '<div><img class="imground" src="' + object.get('photo')._url + '"></div>':
              '<div>no image</div>'
            );
            })(jQuery);  
            }           
            }
          });











var timeTable = Parse.Object.extend("time_table");
var query = new Parse.Query(timeTable);


  query.equalTo("username", username);
  query.find({
    success: function(results) {
      //alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
         
        var object = results[i];

                  

        var week = object.get("week");

        var start_time = parseInt(object.get("start_time"));

        var time_height = object.get("time_row");

        var class_name = object.get("class_name");
        if(class_name!="busy"){
          if(time_height==3){
            $("tr#" +start_time+ " td."+week).text(class_name).addClass("my-class-time");
            $("tr#" +(start_time+1)+ " td."+week).text(class_name).addClass("my-class-time");
            $("tr#" +(start_time+2)+ " td."+week).text(class_name).addClass("my-class-time");
          }else if(time_height==4){
            $("tr#" +start_time+ " td."+week).text(class_name).addClass("my-class-time");
            $("tr#" +(start_time+1)+ " td."+week).text(class_name).addClass("my-class-time");
            $("tr#" +(start_time+2)+ " td."+week).text(class_name).addClass("my-class-time");
            $("tr#" +(start_time+3)+ " td."+week).text(class_name).addClass("my-class-time");
          }
        }else{
          $("tr#" +start_time+ " td."+week).text(class_name).addClass("clicked");
        }
      }

    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }


  });










      $("#signOut").on("click",function(){
        console.log("click");
        localStorage.username = "";
        localStorage.setItem("firstName","");
        localStorage.setItem("lastName","");
        localStorage.setItem("email","");
        window.location.replace("index.html");

        Parse.User.logOut();
      });













  }else{  
  window.location.replace("index.html");
  }
});
  



 