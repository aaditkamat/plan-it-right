/*jslint for:true*/
import {addButton} from "./button.js";
import {addDirections} from "./directions.js";

const getData = () => {
    let sortProperty = (result1, result2) => result2.rating - result1.rating;
    $.getJSON(`country_data/${formOptions.city}_Hotels.json`, (data) => {
        data.results.sort(sortProperty);
        dataSources.push(data);
        $.getJSON(`country_data/${formOptions.city}.json`, (data) => {
            dataSources.push(data);
            for (let option of formOptions.additionalDetails) {
                $.getJSON(`country_data/${formOptions.city}_${option}.json`, (data) => {
                    dataSources.push(data);
                });
            }
            addContent(formOptions);
            addDirections();
        });
    });
};

const createPlan = (planItems, planContents, curr_day) => {
    let ctr = 1;

    let addStars = (rating, starSection) => {
        let createStar = (width) => {
            const outerStar = document.createElement('i'), innerStar = document.createElement('i');
            innerStar.className = 'star star-over fa fa-star star-visible';
            if (width !== null)
                innerStar.style.width = `${width}%`;
            outerStar.className = 'star star-under fa fa-star';
            outerStar.append(innerStar);
            starSection.append(outerStar);
        };
        for (let j = 0; j <= parseInt(rating); j++)
            if (j !== parseInt(rating))
                createStar(null);
            else
                createStar((rating - parseInt(rating)) * 100);
    };

    for (let i = 0; i < planItems.length; i++) {
        const entityDetails = document.createElement("div");
        entityDetails.className = "entity_details";
        const horizontalSection = document.createElement("div");
        horizontalSection.className = "horizontal_section";
        const entityName = document.createElement("h3");
        entityName.className = "entity_name";
        const entityTime = document.createElement("h4");
        entityTime.className = "entity_time";
        const starSection = document.createElement("div");
        starSection.className = "star_section";
        const circle = document.createElement("div");
        circle.className = "timeline_circle";
        circle.style = `margin-left: -115px; margin-top: -70px; position: absolute;`;
        const imageTag = document.createElement("img");
        if (planItems[i].day === curr_day) {
            entityName.innerText = planItems[i].name;
            entityTime.innerText = planItems[i].time;
            circle.innerHTML = `<svg height="100" width="100">
            <circle cx="50" cy="50" r="10" stroke="black" stroke-width="3" fill="black" />
            <text fill="#ffffff" font-size="10" font-family="Verdana" x="48" y="54">${ctr++}</text>
            </svg>`;
            var domObjects = [horizontalSection, entityDetails, entityTime, imageTag, circle, entityName, planContents];
            getDestinationAttributes(domObjects);
            addStars(planItems[i].rating, starSection);
            let ratingSpan = document.createElement('span');
            ratingSpan.className = 'rating-span';
            if (planItems[i].rating !== parseInt(planItems[i].rating))
                ratingSpan.innerText = planItems[i].rating;
            else
                ratingSpan.innerText = planItems[i].rating + '.0';
            domObjects.splice(3, 0, starSection);
            domObjects.push(ratingSpan);
            handleDomObjects(domObjects);
        }
    }
};

const addContent = (formOptions) => {
    const combineJSON = (firstJSON, secondJSON) => {
            return {
                first: firstJSON,
                second: secondJSON
            };
    };
    const numOfDays = getLengthOfTrip(formOptions), planItems = [];

    const addData = (result, day, time) => {
        if (result !== undefined) {
            planItems.push({
                name: result.name,
                address: result.formatted_address,
                time: time,
                day: day,
                rating: result.rating,
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng,
            });
        }
    };

    const sortingAlgo = () => {
        const distance = (x1, y1, x2, y2) => {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        };

        const sortingProperty = (item1, item2) => {
            let x1 = item1.lat, y1 = item1.long, x2 = item2.lat, y2 = item2.long, x3 = currPoint.lat,
                y3 = currPoint.long;
            return distance(x2, y2, x3, y3) - distance(x1, y1, x3, y3);
        };
        const startPoint = dataSources[0].results[0];
        let first_temp = [], second_temp = [startPoint], currPoint = startPoint;

        for (let i = 1; i < dataSources.length; i++) {
            for (let j = 0; j < dataSources[i].results.length; j++) {
                first_temp.push(dataSources[i].results[j]);
            }
        }

        for (let curr_day = 1; curr_day <= numOfDays; curr_day++) {
            for (let j = 1; j <= 2; j++) {
                first_temp.sort(sortingProperty);
                second_temp.push(first_temp.pop());
            }
            currPoint = startPoint;
        }
        return second_temp;
    };

    let day = 0, ctr = 0, currTime = '', displayTime = currTime;

    const generateTime = (day, currTime) => {
        if (currTime.hours() === 0)
            displayTime = '12:00 am';
        else if (currTime.hours() >= 1 && currTime.hours() <= 11)
            displayTime = `${currTime.hours()}:00 am`;
        else if (currTime.hours() === 12)
            displayTime = `12:00 pm`;
        else
            displayTime = `${currTime.hours() - 12}:00 pm`;
        return displayTime;
    };

    let results = sortingAlgo(), startPoint = results.reverse().pop(), currPoint = startPoint;
    results.reverse();
    for (let i = 0; i < results.length + numOfDays; i++) {
        day = Math.floor(i / 3) + 1;
        if (planItems.length === 0 || day > planItems[planItems.length - 1].day) {
            currTime = moment(new Date(1970, 1, 1, 10, 0, 0));
            currPoint = startPoint;
        }
        else {
            currTime = currTime.add(1, 'hours');
            currPoint = results[ctr++];
        }
        addData(currPoint, day, generateTime(day, currTime));
    }


    for (let curr_day = 1; curr_day <= numOfDays; curr_day += 1) {
        const plan = document.createElement("div");
        plan.className = "plan";
        const planContents = document.createElement("div");
        planContents.className = "plan_contents";
        itinerary_area.append(plan);
        if (curr_day === 1) {
            plan.style = "margin-top: 76px;";
        }
        itinerary_area.append(document.createElement("br"));
        const dayText = document.createElement("h2");
        dayText.innerText = "Day " + curr_day;
        plan.append(dayText);
        plan.append(planContents);
        createPlan(planItems, planContents, curr_day);
    }
    document.title = formOptions.city + " Trip Itinerary";
    addButton("get-trip", "Get a downloadable copy of the trip", formOptions.city, planItems);
    addButton("get-calendar", "Get calendar for the trip", combineJSON(planItems, formOptions), planItems);
};

var getDestinationAttributes = function(domObjects) {
    const service = new google.maps.places.PlacesService(map);
    var places = null;
    const request = {
        address: domObjects[5].innerText,
        region: "sg"
    };
    const imageTag = domObjects[3];
    imageTag.id = request.address;
    imageTag.className= "destination_images";
    var ctr = 0;

    let action = (status) => {
        console.log(request.address + ": " + status);
    };

    let populatePopupContent = (place, popUpContent) => {
        let openingHours = document.createElement('h4');
        openingHours.className ="opening-hours-label";
        openingHours.innerText = "Opening Hours:";
        let openingHoursDiv = document.createElement('div');
        openingHoursDiv.className = "opening-hours-content";
        let openNowLabel = document.createElement('h4'), openNowBox = document.createElement('div');
        openNowLabel.className ="open-today";
        let image = document.createElement('img');
        image.src = "";
        if ('opening_hours' in place && 'open_now' in place.opening_hours) {
            const array = place.opening_hours.weekday_text, openNow = place.opening_hours.open_now;
            for (let i = 0; i < array.length; i++)
                openingHoursDiv.innerText += array[i] + "\n";
            openNowLabel.innerText = `Open Now:`;
            if (openNow)
                openNowBox.style.color = "green";
            else
                openNowBox.style.color = "red";
            openNowBox.innerText = openNow;
            openNowBox.className = "open-now-box";
        }
        if ('photos' in place && place.photos.length > 2) {
            image.src = place.photos[2].getUrl({
                maxWidth: 600,
                maxHeight: 400
            });
            popUpContent.append(image);
        }
        for (let i = 0; i < 3; i++)
            popUpContent.append(document.createElement('br'));
        popUpContent.append(openingHours);
        popUpContent.append(openingHoursDiv);
        for (let i = 0; i < 2; i++)
            popUpContent.append(document.createElement('br'));
        popUpContent.append(openNowLabel);
        popUpContent.append(openNowBox);
    };

    let addPopupContent = (place, popUpContent) => {
        let placeName = document.createElement('h1');
        placeName.className = "place-name";
        if (typeof place === 'object')
            placeName.innerText = `${place.name}`;
        else
            placeName.innerText = `${place}`;
        popUpContent.append(placeName);
        for (let i = 0; i < 2; i++)
            popUpContent.append(document.createElement('br'));
    };

    let createPopup = (place, ctr) => {
        let popUp = document.createElement('div');
        popUp.className = "popup";
        let popUpContent = document.createElement('div');
        popUpContent.className = "popup-content";
        let closeButtonBox = document.createElement('div');
        closeButtonBox.className = "close-button-box";
        let closeButton = document.createElement('span');
        closeButton.className = "close-button";
        closeButton.id = "" + ctr;
        closeButton.innerHTML = "&times;";
        closeButtonBox.append(closeButton);
        popUpContent.append(closeButtonBox);
        addPopupContent(place, popUpContent);
        if (typeof place === "object")
            populatePopupContent(place, popUpContent);
        popUp.append(popUpContent);
        document.body.append(popUp);
     };

    var second_callback = (place, status) => {
        if (place !== null) {
            //console.log(place.name + ": " + status);
            createPopup(place, ctr++);
        }
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.photos !== undefined)
                imageTag.src = place.photos[0].getUrl({maxHeight: 300, maxWidth: 400});
        } else {
            action(status);
        }
    };

    var first_callback = (result, status) => {
        places = result;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const placeId = places[0].place_id;
            service.getDetails({placeId: placeId}, second_callback);
        } else {
            createPopup(request.address, ctr++);
            action(status);
        }
    };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, first_callback);
};



var handleDomObjects = (domObjects) => {
    /**
     * Unpackaging contents of the domObjects array into respective variables.
     */
    const horizontalSection = domObjects[0];
    const entityDetails = domObjects[1];
    const entityTime = domObjects[2];
    const starSection = domObjects[3];
    const image_tag = domObjects[4];
    const circle = domObjects[5];
    const entityName = domObjects[6];
    const planContents = domObjects[7];
    const ratingSpan = domObjects[8];
    let findPopUp = () => {
        let popUps = document.querySelectorAll('div.popup');
        for (var i = 0; i < popUps.length; i++) {
            if (entityName.innerText === popUps[i].childNodes[0].childNodes[1].innerText)
                return popUps[i];
        }
    };

    /**
     * Appending the DOM objects in the correct order.
     */
    horizontalSection.append(entityTime);
    horizontalSection.append(entityName);
    entityDetails.append(horizontalSection);
    entityDetails.append(ratingSpan);
    if (entityName.innerText !== "Lunch" && entityName.innerText !== "Dinner") {
        entityDetails.append(starSection);
        entityDetails.append(image_tag);
    }
    entityDetails.append(circle);
    //adding action upon clicking enittyDetails div in HTML
    entityDetails.addEventListener("click", function() {
            let popUp = findPopUp();
            popUp.style.display="block";
            console.log(this.childNodes[2].id + " clicked and popup is: " + popUp);
            if (popUp !== undefined) {
                $(".close-button").on("click", function() {
                    console.log("Close button clicked");
                    popUp.style.display = "none";
                });
            } 
    });
    //adding line break between each plan item
    entityDetails.append(document.createElement("br"));
    planContents.append(entityDetails);
};

getData();
