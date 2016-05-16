$(document).ready(function(){

	var id = location.pathname.split('/')[2];

	console.log(id);


	var ref = new Firebase("https://restaurant-review-1.firebaseio.com/restaurant/" + id);
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(data) {
	  console.log(data.val());

	$(".title").append(data.val().name.charAt(0).toUpperCase() + data.val().name.slice(1) );
		          
	$("tbody").append(
		"<tr>" + 
		"<td>" + "<img src=" + data.val().image + " class='img-responsive' alt='Image of Restaurant'>" + "</td>" + 
		"<td>"  + data.val().name + "</td>" + 
		"<td>" + data.val().cuisineType + "</td>" + 
		"<td>" + data.val().address + "</td>" + 
		"<td>" + data.val().openTime + "</td>" + 
		"<td>" + data.val().closeTime + "</td>" +
	"</tr>"
      );
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	var reviewRef = new Firebase("https://restaurant-review-1.firebaseio.com/reviews/" + id);

    $("#createReviewButton").click(function(event){
        event.preventDefault();
        // console.log('hello world');
        var author = $('#reviewAuthor').val();
        var review = $('#review').val();

        console.log(name + review);

        // var restaurantImage = image;
      // // Login Users

        reviewRef.push({
          author: author,
          review: review
        });

	    location.reload();
    });

	reviewRef.once("value", function(snapshot) {
		// console.log(snapshot);
	    snapshot.forEach(function(data) {
	    	console.log(data.val().author);

	    	$("#reviewParagraph").append(data.val().author + " says " + data.val().review + "<br><br>");
	    })

	    // location.reload();
	});


})