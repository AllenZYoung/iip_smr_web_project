
run()

function run(){
	inscription_list.forEach(function(inscrid){
		url_json = "https://library.brown.edu/cds/projects/iip/api/?start=0&rows=100&indent=on&wt=json&q=inscription_id%3A" + inscrid;
		$.getJSON(url_json, function(data){
			if (data["response"]["docs"][0]["city_pleiades"]){
				console.log(inscrid + ": pleiades id detected");
				var pleiades = data["response"]["docs"][0]["city_pleiades"]
				getCoordinates(pleiades, inscrid);
			}
			else{
				console.log(inscrid + ": no pleiades id detected");

				drawMaplet(null, inscrid);

				// $("#maplet"+id.toString()).html('<img src="{{STATIC_URL}}iip_search_app/images/placeholder.png" style= "width: 100px; height: 100px;" />');
				console.log(inscrid + ": placed placeholder image");
			}
		});
	});

}


function getCoordinates(pleiades, inscrid) {
	if (pleiades.slice(-6) === "380758") {
	    pleiades = "https://pleiades.stoa.org/places/678006";
	}

	$.getJSON('https://pleiades.stoa.org/places/' + pleiades.slice(-6) + '/json', function(data) {
    if (data.reprPoint) {
      drawMaplet(data.reprPoint, inscrid);
    }
    else{
      console.log("error in maplet.js");
    }
  });
}


function drawMaplet(geoCoordinates, inscrid){
	var maplet = L.map("maplet"+inscrid, {zoomControl:false, attributionControl:false}).setView([31.764650, 35.216377], 4)

	var base_tile = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGs1OCIsImEiOiJjajQ4aHd2MXMwaTE0MndsYzZwaG1sdmszIn0.VFRnx3NR9gUFBKBWNhhdjw', {
	        id: 'isawnyu.map-knmctlkh',
	        accessToken: 'pk.eyJ1IjoiZGs1OCIsImEiOiJjajQ4aHd2MXMwaTE0MndsYzZwaG1sdmszIn0.VFRnx3NR9gUFBKBWNhhdjw'
	    }).addTo(maplet);

	if (geoCoordinates != null){
		L.marker([geoCoordinates[1], geoCoordinates[0]]).addTo(maplet);
	}
}
