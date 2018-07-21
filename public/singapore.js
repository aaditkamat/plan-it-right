const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAsXD3FmNWPEkyDizfku16k-S4YyJmjQQQ'
});

var first_query = {'query': 'Singapore Flyer'};
var photo_tag = null;
var callback = function(err, response) {
    if (!err) {
       console.log(response.json);
    } else if (err === 'timeout') {
        return "In callback: timeout" ;
    } else if (err.json) {
        return "That is: " + err.json;
    } else {
        return "This is: " + err;
    }
};
googleMapsClient.places(first_query, callback);

/*var second_query = {'photoreference': 'Singapore Flyer', 'maxwidth': 400, 'maxheight': 300};
googleMapsClient.placesPhoto(query, callback);*/
  