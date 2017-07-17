var map;
var counter, track = 0;
var markerArrayVariying = [] ,removeMarkers , tempArrayLocation;
function initialize() {
	var unformattedLocation = newPlace.location();
	var locations = [];

	var locationFinder = function(){
		//this function gets all the locations from the app.js
		//and adds it to locations array

		unformattedLocation.forEach(function(place){
			locations.push(place.name)
		});
	}
	var mapOptions = {
		zoom: 14,
		//center: new google.maps.LatLng(12.977417, 77.734966),
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	removeMarkers = function (newMarkerArray) {
		console.log('removed')
		var i = 0;
		for(i=0 ; i< newMarkerArray.length ; i++){
			if(newMarkerArray[i]){
				markerArrayVariying[i].setMap(map);
			} else {
				markerArrayVariying[i].setMap(null)
			}
		}
	}


	function createMapMarker(placeData) {

    	// The next lines save location data from the search result object to local variables
    	var lat = placeData.geometry.location.lat();  // latitude from the place service
    	var lon = placeData.geometry.location.lng();  // longitude from the place service
    	var name = placeData.formatted_address;   // name of the place from the place service
    	var bounds = window.mapBounds;            // current boundaries of the map window

    	// marker is an object with additional data about the pin for a single location
    	var marker = new google.maps.Marker({
    		map: map,
      		position: placeData.geometry.location,
      		title: name
    	});
		marker.id = track++
		markerArrayVariying.push(marker);
    	// infoWindows are the little helper windows that open when you click
    	// or hover over a pin on a map. They usually contain more information
    	// about a location.
    	var infoWindow = new google.maps.InfoWindow({
      		content: name
    	});

    	// hmmmm, I wonder what this is about...
    	google.maps.event.addListener(marker, 'click', function() {
			//newPlace.location(tempArrayLocation)
    		console.log('clicked' , marker.title , this.position.lat() , this.position.lng())
    		//newPlace.enablemodal = true;
    		//console.log('clicked' , marker.title, this.position.lng() )
			tempArrayLocation = newPlace.location();
			// for(i=0 ; i<markerArrayVariying.length ; i++) {
			// 	console.log('hi')
			// 	if(this.id == i){
			// 		// console.log(this.title)
					
			// 	}
			// }
			newPlace.location([newPlace.location()[this.id]])
			//newPlace.location([{name: 'hi'}])
    		newPlace.changeClass(this.position.lat() , this.position.lng());
    	});

    	// this is where the pin actually gets added to the map.
    	// bounds.extend() takes in a map location object
    	bounds.extend(new google.maps.LatLng(lat, lon));
    	// fit the map to the new marker
    	map.fitBounds(bounds);
    	// center the map
    	map.setCenter(bounds.getCenter());
  	}

  	/*
  	callback(results, status) makes sure the search returned results for a location.
  	If so, it creates a new map marker for that location.
  	*/
  	function callback(results, status) {
  		if (status == google.maps.places.PlacesServiceStatus.OK) {
      		createMapMarker(results[0]);
    	}
  	}
  	
  	//pinPoster(locations) takes in the array of locations created by locationFinder()
  	//and fires off Google place searches for each location

  	function pinPoster(locations) {

    	// creates a Google place search service object. PlacesService does the work of
    	// actually searching for location data.
    	var service = new google.maps.places.PlacesService(map);

    	// Iterates through the array of locations, creates a search object for each location
    	locations.forEach(function(place){
      		// the search request object
      		var request = {
        		query: place
      		};

      		// Actually searches the Google Maps API for location data and runs the callback
      		// function with the search results after each search.
      		service.textSearch(request, callback);
    	});

 	}
 	window.mapBounds = new google.maps.LatLngBounds();


  locationFinder();
  pinPoster(locations);


}
initialize();