$(document).ready(function () {
    var data = JSON.parse(sessionStorage.getItem('formOptions')), title = data.city.toLowerCase();
    var heading = document.createElement('h5');
    heading.style = 'color: white; width:100%; text-align:center; padding-top: 30px;';
    heading.innerText = 'PLANITRIGHT TRIP PLANNER';
    var imageDiv = $('div.hero-area.height-400.bg-img.background-overlay');
    imageDiv.attr(`style`, `background-image: url(images/destinations/${getImageLabel(title)}.jpg)`);
    title = toTitleCase(title);
    var planTitle = document.createElement('h1');
    planTitle.style = 'color: white; padding-top: 175px; text-decoration: none;';
    planTitle.innerText = `${getLengthOfTrip(data)} days in ${title}`;
    imageDiv.append(planTitle);
    imageDiv.append(heading);
    addMap(title);
});

var getLengthOfTrip = (data) => {
    return data.lengthOfTrip;
};

var getImageLabel = (title) => {
    let split = title.split(" "), newTitle = split[0];
    if (split.length > 1) {
        for (let i = 1; i < title.split(" ").length; i++) {
            newTitle += "%20" + split[i];
        }
    }
    return newTitle;
};

var toTitleCase = (title) => {
    return title.charAt(0).toUpperCase() + title.substr(1);
};

var addMap = (title) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${title}&key=AIzaSyCrNXjZyEsYwUBxtiSiqfqs9pJcRMf1LwQ`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.type = "json";
    xhr.send();
    xhr.addEventListener('load', () => {
        const place = JSON.parse(xhr.response).results[0];
        if (place !== undefined) {
            map = new google.maps.Map(document.getElementById("map"), {
                center: new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng),
                zoom: 10
            });
            marker = new google.maps.Marker({
                position: map.center,
                map: map,
                title: 'Added new marker'
            });
        }
    });
};

