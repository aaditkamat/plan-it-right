var json_url = 'https://planitright.herokuapp.com/status.json', data = {};
request = new XMLHttpRequest();

request.open('GET', json_url);
request.responseType = 'json';
request.send();
request.onload = function() {
    data = request.response;
    if (data.googleSignIn === false)
        alert('Cannot access this page without logging in');
        self.location = 'index.html';
}