$( document ).ready(function() {
 var username = localStorage.username;
    if(username!=""){   

        Parse.initialize("hS3IWSgZKENFDTTbACS9JXC53QWDSyzAsmQ9I5Ez", "lgeS8H24S0GJa7bXdymfblJatLzFmA0TohBE1Www");
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










        


    $("#profilesave").click(function(){
       $('#myprofile').submit();
    }); 

     $('#myprofile').on('submit', function(e){
        e.preventDefault();
        var data = $("#myprofile :input").serializeArray();
        localStorage.setItem("firstName",data[0].value);
        localStorage.setItem("lastName",data[1].value);
        localStorage.setItem("email",data[2].value);
        window.location.replace("profile1.html");

         
    });






           $("#signOut").on("click",function(){
        console.log("click");
        localStorage.username = "";
        localStorage.setItem("firstName","");
        localStorage.setItem("lastName","");
        localStorage.setItem("email","");
        window.location.replace("index.html");
      });













  }else{  
  window.location.replace("index.html");
  }

  

});
