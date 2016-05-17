$(document).ready(function(){
	!function(){"use strict";function t(t,i,n,e){function r(t,i){for(var n=0;n<t.length;n++){var e=t[n];i(e,n)}}function a(t){s(t),o(t),u(t)}function s(t){t.addEventListener("mouseover",function(i){r(f,function(i,n){n<=parseInt(t.getAttribute("data-index"))?i.classList.add("is-active"):i.classList.remove("is-active")})})}function o(t){t.addEventListener("mouseout",function(t){-1===f.indexOf(t.relatedTarget)&&c(null,!1)})}function u(t){t.addEventListener("click",function(i){i.preventDefault(),c(parseInt(t.getAttribute("data-index"))+1,!0)})}function c(t,a){t&&0>t||t>n||(void 0===a&&(a=!0),i=t||i,r(f,function(t,n){i>n?t.classList.add("is-active"):t.classList.remove("is-active")}),e&&a&&e(d()))}function d(){return i}var f=[];return function(){if(!t)throw Error("No element supplied.");if(!n)throw Error("No max rating supplied.");if(i||(i=0),0>i||i>n)throw Error("Current rating is out of bounds.");for(var e=0;n>e;e++){var r=document.createElement("li");r.classList.add("c-rating__item"),r.setAttribute("data-index",e),i>e&&r.classList.add("is-active"),t.appendChild(r),f.push(r),a(r)}}(),{setRating:c,getRating:d}}window.rating=t}();



var el = document.querySelector('#el');

var stars; 

$('#input-id').on('rating.change', function(event, value, caption, target) {
    console.log(value);
    stars = value; 
    // console.log(caption);
    // console.log(target);
});



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
		"<td>" + "<a href=/restaurant/" + data.key() + ">" + data.val().name + "</a>" + "</td>" + 
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
        var date = $('#reviewDate').val();
        var rating = stars;

        console.log(name + review + rating);


        reviewRef.push({
          	author: author,
          	review: review,
          	date: date,
        	rating: rating
        });

	    location.reload();
    });

	reviewRef.once("value", function(snapshot) {
		// console.log(snapshot);
	    snapshot.forEach(function(data) {
	    	console.log(data.key());

	    	$("#reviewParagraph").append("<input id=" + '"' + data.key() + '"' +  " value=" + '"' + data.val().rating  + '"' + " class="+ '"' + 'rating rating-loading' + '"' + ">"    + "<br><br>" + data.val().author + " says " + data.val().review + "<br><br><br>");

	    	$('#'+data.key()).rating({displayOnly: true, step: 0.5, size:"xs"});
	    })

	    // location.reload();
	});


})