var json_url = 'https://planitright.herokuapp.com/status.json', data = {};
request = new XMLHttpRequest();

request.open('GET', json_url);
request.responseType = 'json';
request.send();
request.onload = function() {
    data = request.response;
    console.log(data);
}