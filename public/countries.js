var json_url = "https://api.myjson.com/bins/rwjfy";
const request = new XMLHttpRequest();
request.open('GET', json_url);
request.response = 'json';
request.send();
request.onload= function() {
    const data = JSON.parse(request.response);
    var array = [];
    var dropdown = document.getElementById("country_options");
    for (var i = 0; i < data.length; i++)
        array.push(data[i].countries);
    array.sort();
    addOption(array, dropdown);
};

var addOption = (array, dropdown) => {
    for (var i = 0; i < array.length; i++) {
        var element = document.createElement('option');
        element.value = array[i];
        element.text = array[i];
        dropdown.appendChild(element);
    }
};