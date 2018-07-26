/*jslint for:true*/
var dev_json = null;
var img_json = null;
const itinerary_area = document.getElementsByClassName("row justify-content-center")[0];

const map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-33.8617374,151.2021291),
    zoom: 15
    });

const firstXhr = new XMLHttpRequest();
firstXhr.open("GET", dev_json_url);
firstXhr.responseType = "json";
firstXhr.send();
firstXhr.addEventListener("load", function() {
    dev_json = firstXhr.response;
    addContent();
});

secondXhr = new XMLHttpRequest();
secondXhr.open("GET", image_json_url);
secondXhr.responseType = "json";
secondXhr.send();
secondXhr.addEventListener("load", function() {
    img_json = secondXhr.response;
});

var addContent;
addContent = function () {
    document.title = dev_json.name.split(" in ")[1] + " Trip Itinerary";
    for (curr_day = 1; curr_day <= dev_json.daysCount; curr_day += 1) {
        const plan = document.createElement("div");
        plan.className = "plan";
        const planContents = document.createElement("div");
        planContents.className = "plan_contents";
        itinerary_area.append(plan);
        if (curr_day === 1) {
            plan.style = "margin-top:120px;";
        }
        itinerary_area.append(document.createElement("br"));
        const dayText = document.createElement("h2");
        dayText.innerText = "Day " + curr_day;
        plan.append(dayText);
        plan.append(planContents);
        createPlan(planContents, curr_day);
    }
    var getPrice = document.createElement("input");
    getPrice.className = "get-price";
    getPrice.value = "Get estimate price for the whole trip";
    getPrice.addEventListener("click", () => {
        sessionStorage.clear();
        sessionStorage.setItem('data', JSON.stringify(dev_json));
        window.open('budget.html');
    });
    document.querySelector(".justify-content-center").append(getPrice);
};

var getAttribute = (placeName, attribute) => {
    const planItems = dev_json.planItems;
    for (i = 0; i < planItems.length; i++) {
        if (placeName === planItems[i].entity.name) {
            return planItems[i].entity[`${attribute}`];
        }
    } 
};

var getRating = (placeName) => { 
    return getAttribute(placeName, 'rating');
};

var getReviews = (placeName) => {
    return getAttribute(placeName, 'reviewsCount');
};

var getImageURL = (placeName) => {
    for (let i = 0; i < img_json.length; i++) {
        if (placeName.includes(img_json[i].Name)) {
            console.log(`Image URL retrieved for: ${img_json[i].Name}`);
            return img_json[i].URL;
        }
        else {
            console.log(`Image URL is not for: ${img_json[i].Name}`);
        }
    }
};

var getDestinationAttributes = function(domObjects) {
    const service = new google.maps.places.PlacesService(map);
    var places = null;
    const request = {
        address: domObjects[6].innerText,
        region: "sg"
    };
    const starSection = domObjects[3];
    const imageTag = domObjects[4];
    imageTag.id = request.address;
    imageTag.className= "destination_images";
    var ctr = 0;
    
    let addRating = (reviews, rating, starSection) => {
        for (let j = 0; j < rating; j++) {
            const starDiv = document.createElement("div");   
            starDiv.style.float="left";
            starDiv.style.marginLeft="5px";
            const star = document.createElement("span");
            star.innerHTML = "&starf;";
            star.style.fontSize = "200%";
            star.style.color="orange";
            starDiv.appendChild(star);
            starSection.appendChild(starDiv);
        }
        const reviewsSection = document.createElement("span");
        reviewsSection.className = "reviews-section";
        reviewsSection.innerText = `(${reviews} reviews)`;
        if (typeof reviews === "number")
            starSection.append(reviewsSection);
    };

    let action = (starSection, status) => {
        let item = img_json.find(function(item) {
            return item.Name.includes(request.address);
        });
        if (item !== undefined)
            imageTag.src = item.URL;
        let rating = Math.round(getRating(request.address));
        let reviews = getReviews(request.address);
        addRating(reviews, rating, starSection);
        console.log(request.address + ": " + status);
    };

    let addPopupContent = (place, popUpContent) => {
        let placeName = document.createElement('h1');
        placeName.className = "place-name";
        let openingHours = document.createElement('h4');
        openingHours.className ="opening-hours-label";
        openingHours.innerText = "Opening Hours:";
        let openingHoursDiv = document.createElement('div');
        openingHoursDiv.className = "opening-hours-content";
        let openNowLabel = document.createElement('h4'), openNowBox = document.createElement('div');
        openNowLabel.className ="open-today";
        let image = document.createElement('img');
        image.src = "";

        if (typeof place === "object") {
            placeName.innerText = `${place.name}`;
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
            if ('photos' in place && place.photos.length > 2) 
                image.src = place.photos[2].getUrl({maxWidth: 600, maxHeight: 400});
            else
                image.src = getImageURL(`${place.name}`);
        }
        else {
            placeName.innerText = `${place}`;
            image.src = getImageURL(`#${place}`);
        }
        popUpContent.append(image);
        for (let i = 0; i < 3; i++)
            popUpContent.append(document.createElement('br'));
        popUpContent.append(placeName);
        popUpContent.append(openingHours);
        popUpContent.append(openingHoursDiv);
        for (let i = 0; i < 2; i++)
            popUpContent.append(document.createElement('br'));
        popUpContent.append(openNowLabel);
        popUpContent.append(openNowBox);
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
        if (typeof place === "object")
            addPopupContent(place, popUpContent); 
        popUp.append(popUpContent);
        document.body.append(popUp);
     };

    var second_callback = (place, status) => {
        if (place !== null) {
            console.log(place.name + ": " + status);
            createPopup(place, ctr++);
        }
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.photos !== undefined)
                imageTag.src = place.photos[0].getUrl({maxHeight: 300, maxWidth: 400});
            else
                imageTag.src = getImageURL(place.name);
            let rating = Math.round(place.rating);
            if (isNaN(rating)) 
                rating = Math.round(getRating(imageTag.id));
            let reviews = null;
            if (typeof places.reviews !== "undefined")
                reviews = place.reviews.length;
            else
                reviews = getReviews(imageTag.id);            
            addRating(reviews, rating, starSection);
        } else {
            action(starSection, status);
        }
    };

    var first_callback = (result, status) => {
        places = result;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const placeId = places[0].place_id;
            service.getDetails({placeId: placeId}, second_callback);
        } else {
            createPopup(request.address, ctr++);
            action(starSection, status);
        }
    };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, first_callback);
};

var createPlan = (planContents, curr_day) => {
    const planItems = dev_json.planItems;
    let ctr = 1;
    for (let i = 0; i < planItems.length; i++) {
        const entityDetails = document.createElement("div");
        entityDetails.className = "entity_details";
        const horizontalSection = document.createElement("div");
        horizontalSection.className = "horizontal_section";
        const entityName = document.createElement("h3");
        entityName.className = "entity_name";
        const entityTime = document.createElement("h4");
        entityTime.className= "entity_time"; 
        const starSection = document.createElement("div");
        starSection.className = "star_section";
        const circle = document.createElement("div");
        circle.className="timeline_circle";
        circle.style = `margin-left: -115px; margin-top: -70px; position: absolute;`;
        const imageTag = document.createElement("img");

        if (planItems[i].day === curr_day) {
            entityName.innerText = planItems[i].entity.name;
            const time = planItems[i].startTime;
            const hour = parseInt(time.split(":")[0]); 
            const minutes = time.split(":")[1];
            if (hour >= 0 && hour <= 11)
                entityTime.innerText = time + " am";
            else if (hour === 12)
                entityTime.innerText = time + " pm";
            else 
                entityTime.innerText = (hour - 12) + ":" + minutes + " pm";
            circle.innerHTML = `<svg height="100" width="100">
            <circle cx="50" cy="50" r="10" stroke="black" stroke-width="3" fill="black" />
            <text fill="#ffffff" font-size="10" font-family="Verdana" x="48" y="54">${ctr++}</text>
            </svg>`;
            var domObjects = [horizontalSection, entityDetails, entityTime, starSection, imageTag, circle, entityName, planContents];
            getDestinationAttributes(domObjects);
            handleDomObjects(domObjects);
        }
    }
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
    let findPopUp = () => {
        let popUps = document.querySelectorAll('.popup');
        for (var i = 0; i < popUps.length; i++) {
            if (popUps[i].childNodes[0].childNodes.length > 1) {
                if (entityName.innerText.includes(popUps[i].childNodes[0].childNodes[5].innerText))
                    return popUps[i];
            }
        }
    };

    /**
     * Appending the DOM objects in the correct order.
     */
    horizontalSection.append(entityTime);
    horizontalSection.append(entityName);
    entityDetails.append(horizontalSection);
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


