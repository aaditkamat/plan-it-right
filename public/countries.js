/* var json_url = "https://api.myjson.com/bins/rwjfy";
const request = new XMLHttpRequest();
request.open('GET', json_url);
request.response = 'json';
request.send(); */
const data = [ { city: "Singapore",country: "Singapore"}, {city: "Macau", country: "China"}, {city: "London", country: "England"}, {city: "Mexico City", country: "Mexico"}];
var array = [];
var dropdown = document.getElementById("country_options");
for (var i = 0; i < data.length; i++)
    array.push(data[i].country);
array.sort();
addOption(array, dropdown);

function addOption(array, dropdown) {
    for (var i = 0; i < array.length; i++) {
        var element = document.createElement('option');
        element.value = array[i];
        element.text = array[i];
        dropdown.appendChild(element);
    }
}