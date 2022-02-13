export function addDirections() {
    const entities = document.querySelectorAll('.entity_details');
    let journeyDetails = null, journey = null, carIcon = null;
    for (let entity of entities) {
        const directionsServices = new google.maps.DirectionsService;
        let directionsRequest = {};
        const callback = (response, status) => {
            if (status === 'OK') {
                journey = document.createElement('div');
                journey.className = "journey";
                journeyDetails = document.createElement('div');
                carIcon = document.createElement('img');
                carIcon.src = './images/icons/sports-car.png';
                journey.append(carIcon);
                journeyDetails.className = 'journey-details';
                journeyDetails.innerText = `${response.routes[0].legs[0].distance.text} (${response.routes[0].legs[0].duration.text})`;
                journey.append(journeyDetails);
                entity.parentNode.insertBefore(journey, entity);
            }
            else {
                console.log('Directions request failed due to ' + status);
            }
        };
        //checking if the item is not tbe first for each day's plan
        if (entity !== entity.parentElement.childNodes[0]) {
            directionsRequest = {
                origin: entity.previousSibling.querySelector('.entity_name').innerText,
                destination: entity.querySelector('.entity_name').innerText,
                travelMode: 'DRIVING'
            };
            directionsServices.route(directionsRequest, callback);
        }
    }
}