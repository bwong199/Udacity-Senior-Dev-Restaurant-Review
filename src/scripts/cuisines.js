$(document).ready(function(){

	var cuisine = location.pathname.split('/')[2];

	console.log(cuisine);

	$(".title").append(cuisine.charAt(0).toUpperCase() + cuisine.slice(1) + " Food Reviews");

	var ref = new Firebase("https://restaurant-review-1.firebaseio.com/restaurant");
	// // Attach an asynchronous callback to read the data at our posts reference
	ref.once("value", function(snapshot) {
	    snapshot.forEach(function(data) {

	    	if (data.val().cuisineType.toLowerCase() === cuisine.toLowerCase() | data.val().city.toLowerCase() === cuisine.toLowerCase()){
	    		console.log(data.key() + " " + data.val().cuisineType.toLowerCase() );



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
	    	}
	    })
	});
})