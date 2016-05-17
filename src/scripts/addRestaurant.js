$(document).ready(function(){
    var myFirebaseRef = new Firebase("https://restaurant-review-1.firebaseio.com/");

    var image; 

    filepicker.setKey("AoT2GIfzhSWiDNGjlyrmaz");

    filepicker.pick(
      function(Blob){
        console.log(Blob.url);

        image = Blob.url;
        console.log(image);
      }
    );

    $("input").keyup(function(){
          if($("#name").val().length < 1 | 
        $("#address").val().length  < 1 | 
        $("#cuisineType").val().length < 1 |
        $("#openTime").val().length < 1 |
        $("#closeTime").val().length < 1 
        ){
        $("#alert").html("All fields must be filled");
        $("button").prop("disabled", true);
      } else {
        $("#alert").html(" ");
        $("button").prop("disabled", false);
      }
    })

    $("#createRestaurantButton").click(function(event){
        event.preventDefault();
        // console.log('hello world');
        var name = $('#name').val();
        var address = $('#address').val();
        var cuisineType = $('#cuisineType').val();
        var openTime = $('#openTime').val();
        var closeTime = $('#closeTime').val();
        // var restaurantImage = image;

        console.log(name + cuisineType + openTime + closeTime  + address );
      // // Login Users
      
        myFirebaseRef.child("restaurant").push({
          name: name,
          cuisineType: cuisineType,
          openTime: openTime, 
          closeTime: closeTime, 
          address: address, 
          image: image
        });

        window.location.href="/";


    });
});