xhr.onload = function() {
    dev_json = xhr.response;
    edit_main_text();
};

edit_main_text = function() {
    for (var curr_day = 1; curr_day <= dev_json.daysCount; curr_day++) {
        const plan = document.createElement("div");
        plan.className= "plan";
        const planContents = document.createElement("div");
        planContents.className = "plan_contents";
        itinerary_area.append(plan);  
        if (curr_day === 1)
          plan.style="margin-top:120px;";
        itinerary_area.append(document.createElement("br"));
        const dayText = document.createElement("h2");
        dayText.innerText = "Day " + curr_day;
        plan.append(dayText);
        plan.append(planContents);
        create_plan(planContents, curr_day, dev_json.daysCount);
    }

};

get_destination_attributes = function(domObjects) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
        address: domObjects[6].innerText,
        region: "sg"
    };

    function first_callback(places, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            //console.log(places);
            var placeId = places[0].place_id;
            service.getDetails({placeId: placeId}, second_callback);
            
            function second_callback(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var imageTag = domObjects[4];
                    imageTag.id = request.address;
                    imageTag.className= "destination_images";
                    imageTag.src =place.photos[0].getUrl({maxHeight: 300, maxWidth: 400});
                    var starSection = domObjects[3];
                    for (var j = 0; j < Math.round(place.rating); j++) {
                        var starDiv = document.createElement("div");   
                        starDiv.style.float="left";
                        starDiv.style.marginLeft="5px";
                        var star = document.createElement("span");
                        star.innerHTML = "&starf;";
                        star.style.fontSize = "200%";
                        star.style.color="orange";
                        starDiv.appendChild(star);
                        starSection.appendChild(starDiv);
                    }
                } else {
                    console.log(request.address + ": " + status);
                }
            }
        } else {
            console.log(name + ": " + status);
        }
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(request, first_callback);
};

create_plan = function(planContents, curr_day, total_days) {
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
            const name = planItems[i].entity.name;
            entityName.innerText = name;
            const time = planItems[i].startTime;
            const hour = parseInt(time.split(":")[0]); 
            const minutes = time.split(":")[1];
            if (hour >= 0 && hour <= 11)
                entityTime.innerText = time + " am";
            else if (hour == 12)
                entityTime.innerText = time + " pm";
            else 
                entityTime.innerText = (hour - 12) + ":" + minutes + " pm";
            circle.innerHTML = `<svg height="100" width="100">
            <circle cx="50" cy="50" r="10" stroke="black" stroke-width="3" fill="black" />
            <text fill="#ffffff" font-size="10" font-family="Verdana" x="48" y="54">${ctr++}</text>
            </svg>`;
            var domObjects = [horizontalSection, entityDetails, entityTime, starSection, imageTag, circle, entityName, planContents];
            get_destination_attributes(domObjects);
            handleDomObjects(domObjects);
        }
    }
};

var handleDomObjects = function(domObjects) {
    /**
     * Unpackaging contents of the domObjects array into respective variables.
     */
    const horizontalSection = domObjects[0];
    const  entityDetails = domObjects[1];
    const  entityTime = domObjects[2];
    const  starSection = domObjects[3];
    const  image_tag = domObjects[4];
    const  circle = domObjects[5];
    const  entityName = domObjects[6];
    const  planContents = domObjects[7];

    /**
     * Appending the DOM objects in the correct order.
     */
    horizontalSection.append(entityTime);
    horizontalSection.append(entityName);
    entityDetails.append(horizontalSection);
    entityDetails.append(starSection);
    entityDetails.append(image_tag);
    entityDetails.append(circle);
    //adding action upon clicking enittyDetails div in HTML
    entityDetails.addEventListener("click", function() {
        const base_url = this.childNodes[0].childNodes[1].innerText;
        const url_safe_data = encodeURI(JSON.stringify(dev_json));
        window.open(base_url + ".html?=data=" + url_safe_data);
    });
    planContents.append(entityDetails);
    //adding line break between each plan item
    entityDetails.append(document.createElement("br"));
};


