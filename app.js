jQuery(function($) {
// Asynchronously Load the map API
  var script = document.createElement('script');
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
});

function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: 'roadmap'
};

map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

var markers = [
    ['Keep Your Chin Up, 21st and Alberta', 45.559257, -122.643864],
    ['Lady in Dress, SW 11th and Washington', 45.521380, -122.682764]
];


var infoWindowContent = [
    ['<div class="info_box">' + '<a href="image/chin_up.jpg">' +
    '<h3>Keep Your Chin Up</h3>' +
    '<img src="image/chin_up.jpg">' + '<h4>Artist Name</h4>' + '<h5>Address</h5>'+ '</a>' + '</div>'],
    ['<div class="info_box">' + '<a href="image/lady_in_dress.jpg">' +
    '<h3>Lady In Dress</h3>' +
    '<img src="image/lady_in_dress.jpg">' +  '</a>' + '<h4>Artist</h4>' + '<h5>Address</h5>' + '</a>' + '</div>']
];

var infoWindow = new google.maps.InfoWindow(), marker, i;

for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: "image/map-marker.png",
        title: markers[i][0]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infoWindow.setContent(infoWindowContent[i][0]);
            infoWindow.open(map, marker);
        }
    })(marker, i));

    map.fitBounds(bounds);

    var $overlay = $('<div id="overlay"></div>');
    var $image = $("<img>");
    var $caption = $("<p></p>");


    $overlay.append($image);
    $overlay.append($caption);
    $("body").append($overlay);

    google.maps.event.addListener(infoWindow, 'domready', function() {
      $(".info_box a").click(function(event){
        event.preventDefault();
        var imageLocation = $(this).attr("href");
        $image.attr("src", imageLocation);

        $overlay.show();
        // var captionText = this.firstChild;
        console.log(this.siblings);
        $caption.append(this.children[2]);
        // $caption.append(captionText);

        // var captionText = $(this).children("img").attr("alt");

        $overlay.click(function(){
          $overlay.hide();
        });
      });
    });
  }
}

// var $overlay = $('<div id="overlay"></div>');
// var $image = $("<img>");
// var $caption = $("<p></p>");
//
// $overlay.append($image);
// $overlay.append($caption);
//
// $("body").append($overlay);
//
// $("#muralGallery a").click(function(event){
//   event.preventDefault();
//   var imageLocation = $(this).attr("href");
//   $image.attr("src", imageLocation);
//
//   $overlay.show();
//   var captionText = $(this).children("img").attr("alt");
//   $caption.text(captionText);
// });
//
// $("#overlay").click(function(){
//   $overlay.hide();
// });
