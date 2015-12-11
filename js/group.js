


var weekFree = [0, 0, 0, 0, 0, 0];
var weekName =["sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
var lovation = [];
function bestTime(groupMeetingTime)  {
  for(i=1;i<=6;i++){
    if(weekFree[i]==0){
      
      var resultsStart = i*48 + 16 +(i-1)*8;
      var top = 64 + (16*5);
      var height = groupMeetingTime*16;
      var endTime = 1 + groupMeetingTime;
      
      $("#resultLine").css({"top": top+ "px", "left":resultsStart + "px" , "height":height + "px"});
      $("#weekResult").append(weekName[i]+" 1:00 ~ " + endTime + ":00");
      break;
    }
    
  }
    
}





function initMap(lat,lng,build_name,address) {
  var uluru = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 17,
    center: uluru
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+build_name+'</h1>'+
      '<div id="bodyContent">'+
      '<p>'+ address+'</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
    infowindow.open(map, marker);
}

$(function() {
var username = localStorage.username;
    if(username!=""){
      Parse.initialize("hS3IWSgZKENFDTTbACS9JXC53QWDSyzAsmQ9I5Ez", "lgeS8H24S0GJa7bXdymfblJatLzFmA0TohBE1Www");


// The Option on Group Member
      var userName = new Parse.Query(Parse.User);

        userName.exists("username");
        userName.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];

              var memberName = object.get("username");
              if(memberName!=username){
                $("#memberName1").append("<option value='" + memberName + "'>" + memberName + "</option>");
                $("#memberName2").append("<option value='" + memberName + "'>" + memberName + "</option>");
                console.log(memberName);
              }

              

              
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });









// The Option on Location form

        var locationExit = Parse.Object.extend("location");
        var query = new Parse.Query(locationExit);
        query.exists("build_name");
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];

              var locationName = object.get("build_name");

              $("#locationName").append("<option value='" + locationName + "'>" + locationName + "</option>");

              //console.log(locationName);
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });















              
         var user = new Parse.Query(Parse.User);
          user.equalTo("username", username);
        // find all the women
        user.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
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


















    $("#username").text(username);
    $("#username_big").text(username);



    $("#createGroup").on("submit",function(e){
      
    e.preventDefault();

    var data = $(this).serializeArray();
      groupName = data[0].value;
      $("#groupName").text(groupName);
      groupMember1 = data[1].value;
      groupMember2 = data[2].value;
      groupMeetingPlace = data[3].value;
      groupMeetingTime = parseInt(data[4].value);
      console.log(groupName + "<br>" + groupMember1 + "<br>" +groupMember2 + "<br>" +groupMeetingPlace + "<br>");
    Parse.initialize("hS3IWSgZKENFDTTbACS9JXC53QWDSyzAsmQ9I5Ez", "lgeS8H24S0GJa7bXdymfblJatLzFmA0TohBE1Www");
    var timeTable = Parse.Object.extend("time_table");
    var query = new Parse.Query(timeTable);

  query.containedIn("username", [username, groupMember1, groupMember2]);
          query.find({
            success: function(results) {
              //alert("Successfully retrieved " + results.length + " scores.");
              // Do something with the returned Parse.Object values
              for (var i = 0; i < results.length; i++) {
                $(".timeTable").append("<div class='timeLine' id=" + i + "></div>");
                var object = results[i];
                var username = object.get("username");
                var week = parseInt(object.get("week"));
                
                  weekFree[week]=1;

                

                
                  week_point = week*48 + 16 +(week-1)*8;
                var start_time = object.get("start_time");
                  start_time = (start_time - 8)*16 +64;
                var time_height = object.get("time_row");
                  time_height = time_height*16;
                var class_name = object.get("class_name");

                
                $("#" + i).css({"top":start_time + "px", "left":week_point + "px" , "height":time_height + "px",});
                $("#" + i).text( username );

                
                
              }
              
                bestTime(groupMeetingTime);
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }


          });
  
  var locationQ = Parse.Object.extend("location");
  var location = new Parse.Query(locationQ);

  location.equalTo("build_name",groupMeetingPlace);
        location.find({
          success: function(results) {
            //alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var object = results[i];

              var address = object.get("address");
              var build_name = object.get("build_name");
              var lat = object.get("build_location").latitude;
              var lng = object.get("build_location").longitude;

              initMap(lat,lng,build_name,address);  
              
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }


        });


  });

      $("#signOut").on("click",function(e){
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

