		$(document).ready(function(){
      var ref = new Firebase("https://restaurant-review-1.firebaseio.com/restaurant");

      var cuisines = []


      ref.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
          console.log("The " + data.key() + " dinosaur's score is " + data.val().name);
          $("tbody").append(
            "<tr>" + 
              "<td>" + "<img src=" + data.val().image + " class='img-responsive' alt='Image of Restaurant'>" + "</td>" + 
              "<td>" + "<a href=/restaurant/" + data.key() + ">" + data.val().name + "</a>" + "</td>" + 
              "<td>" + data.val().cuisineType + "</td>" + 
              "<td>" + data.val().address + "</td>" + 
              "<td>" + data.val().openTime + "</td>" + 
              "<td>" + data.val().closeTime + "</td>" +
            "</tr>"
          );

          cuisines.push(data.val().cuisineType.toLowerCase());


        });

        console.log(cuisines);
      
        var uniqueCuisines = jQuery.unique(cuisines);

        for (var x in uniqueCuisines){
          console.log(uniqueCuisines[x]);

          $(".dropdown-menu").append(
            "<li><a href="  + "'" +  '/cuisines/' + uniqueCuisines[x] + "'" + "</a>" + uniqueCuisines[x].charAt(0).toUpperCase() + uniqueCuisines[x].slice(1) + "</li>"

          )
        }

 

        console.log(uniqueCuisines);

        // for (var x in snapshot.val()){
        //   console.log(x.key)
        //   $("tbody").append(
        //     "<tr>" + 
        //       "<td>" + snapshot.val()[x]["name"] + "</td>" + 
        //       "<td>" + snapshot.val()[x]["cuisineType"] + "</td>" + 
        //       "<td>" + snapshot.val()[x]["address"] + "</td>" + 
        //       "<td>" + snapshot.val()[x]["openTime"] + "</td>" + 
        //       "<td>" + snapshot.val()[x]["closeTime"] + "</td>" +
        //     "</tr>"
        //   );
        // }


      });
		});
