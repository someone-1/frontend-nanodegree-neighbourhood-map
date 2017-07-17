function locations(name){
	this.name = name;
	this.lon = '';
	this.lat = '';
};
var count =0;
//defining a class for 
function place(){
	//location contains the array of locations
	var locationList = [new locations('tajmahal') , new locations('lalbagh') , new locations('mysore palace')];

	this.location = ko.observableArray(locationList);
	//search filter
	this.filter = ko.observable("");

	//this.places = ko.observable(locationList)
	var self = this;

	//places contains the array of locations
	this.places = ko.dependentObservable(function(){
		//var self = this;
		var filter = this.filter().toLowerCase();

		if(!filter){
			if(count){
				removeMarkers([true, true, true])
			}
			count++;
			return this.location();
			// //console.log(this.location());
			// return this.location();

		} else {
			// return ko.utils.arrayFilter(self.location() , function(loc){
				
			// 	return stringStartsWith(loc.name.toLowerCase() , filter);
			// })
			var updatingLocation = []
			//console.log(locationList);
			var filteredArray = ko.utils.arrayFilter(this.location() , function(loc){
				var isPresent =  stringStartsWith(loc.name.toLowerCase() , filter);
				updatingLocation.push(isPresent);
				return isPresent;
			})
			// debugger;
			console.log('hix', updatingLocation)
			//reloading markers in maps
			removeMarkers(updatingLocation);
			console.log(filteredArray,'filteredArray')
			return filteredArray;
		};
	} , this);

	//set initial class of the modal
	this.className = ko.observable('disable modal');

	
	//information in the modal 
	this.placeLink = ko.observable('');
	this.placeName = ko.observable('');
	this.placeInfo = ko.observable('');

	var client_id = 'VSIVTMKJH42JH024XSC15BQZ0RFFPE2EYWJ0HAJBVWOMKWL0';
	var client_secret = 'X2Q4XQNEGGSS430MV2PMFJXE13NUBHWE2S42O5RLLOCT2G3I';


	//this function can be called from map.js file when the maker is clicked
	//using this function we have to change the class of the modal
	this.changeClass = function(lat , lng){
		var self = this;
		var url = 'https://api.foursquare.com/v2/venues/explore?ll=' +
		lat + ',' + lng + 
		'&oauth_token=X03Z1UWJVJWHK42ATKXEOTJ1NC4XZKTSZ2I03IA1DO3GHW0G&v=20170619'
		$.ajax({url : url , success : function(result){
			var response = result.response.groups[0];
			
			self.placeLink(response.items[0].venue.url);
			self.placeName(response.items[0].venue.name);
			self.placeInfo(response.items[0].tips[0].text)
			self.className('modal');
		}})
	}

	this.closeModal = function(){
		this.location(tempArrayLocation)
		this.className('disable modal');
	}

}
var newPlace = new place();
ko.applyBindings(newPlace)
//https://api.foursquare.com/v2/venues/explore?ll=27.1750151,78.04215520000002&oauth_token=X03Z1UWJVJWHK42ATKXEOTJ1NC4XZKTSZ2I03IA1DO3GHW0G&v=20170619

var stringStartsWith = function (string, startsWith) {          
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};
