var json_url = "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";
const xhr = new XMLHttpRequest();
xhr.open('GET', json_url);
xhr.response = 'json';
xhr.send();
xhr.onload= function() {
    const data = JSON.parse(xhr.response);
    var array = [];
    for (var i = 0; i < data.length; i++)
        array.push(data[i].name);
    console.log(array);
};