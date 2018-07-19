var data_url = 'https://api.myjson.com/bins/14jn0a';

request = new XMLHttpRequest();
data = null;
var itinerary_area = document.getElementsByClassName("row justify-content-center")[0];

request.open('GET', data_url);
request.responseType = 'json';
request.send();
request.onload = function() {
    data = request.response;
    edit_main_text();
}


parseDateObj = function(date) {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

edit_title = function() {
    var documentTitle = document.querySelector("title");
    var startDateObj = new Date(data.startDate);
    var endDateObj = new Date(data.endDate);
    documentTitle.innerText = data.name + " " + "(" + parseDateObj(startDateObj) + " to " + parseDateObj(endDateObj) + ")";
}

edit_main_text = function() {
    for (var day = 1; day <= data.daysCount; day++) {
        var plan = document.createElement("div");
        plan.className= "plan";
        var planContents = document.createElement("div");
        planContents.className = "plan_contents";
        itinerary_area.append(plan);  
        if (day === 1)
          plan.style="margin-top:120px;";
        itinerary_area.append(document.createElement("br"));
        var dayText = document.createElement("h2");
        dayText.innerText = "Day " + day;
        plan.append(dayText);
        plan.append(planContents);
        create_plan(planContents, day);
    }

}

get_image_url = function(text) {
    var re = /attraction/gi;
    var image_url = "https://www.google.com/search?safe=active&tbm=isch&source=hp&biw=1440&bih=803&ei=ri8-W7qGDozkvgTn64XQDQ&q=attraction&oq=attraction"
    image_url = image_url.replace(re, text);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', image_url, true);
    xhr.send();
    xhr.onload = function() {
        console.log(request.response);
    }
    xhr.onerror = function() {
        console.log('There was an error!');
    }
    return image_url;
} 

create_plan = function(planContents, day) {
    var planItems = data.planItems;
    for (var i = 0; i < planItems.length; i++) {
        var entityDetails = document.createElement("div");
        entityDetails.className = "entity_details";
        var horizontalSection = document.createElement("div");
        horizontalSection.className = "horizontal_section";
        var entityName = document.createElement("h3");
        entityName.className = "entity_name";
        var entityTime = document.createElement("h4");
        entityTime.className= "entity_time"; 
        var starSection = document.createElement("div");
        starSection.className = "star_section";
        var numberOfStars = null;

        var circle = document.createElement("div");
        circle.className="timeline_circle";
        circle.innerHTML = `<svg height="100" width="100">
        <circle cx="50" cy="50" r="10" stroke="black" stroke-width="3" fill="black" />
        </svg>`;
        circle.style = `margin-left: -115px; margin-top: -70px; position: absolute;`;

        var imageDiv = document.createElement("div");
        imageDiv.className="destination_images";
        var image = document.createElement("img");
        imageDiv.append(image);

        if (planItems[i].day === day) {
            name = planItems[i].entity.name;
            entityName.innerText = name;
            time = planItems[i].startTime;
            hour = parseInt(time.split(":")[0]); 
            minutes = time.split(":")[1];
            if (hour >= 0 && hour <= 11)
                entityTime.innerText = time + " am";
            else
                entityTime.innerText = (hour - 12) + ":" + minutes + " pm";
            numberOfStars = planItems[i].entity.rating;
            image.src = planItems[i].entity.image_url;
        }

        if (numberOfStars != null) {
            horizontalSection.append(entityTime);
            horizontalSection.append(entityName);
            entityDetails.append(horizontalSection);
            entityDetails.append(starSection);
            entityDetails.append(imageDiv);
            entityDetails.append(circle);
            entityDetails.addEventListener("click", function() {
                var base_url = this.childNodes[0].childNodes[1].innerText;
                window.open(base_url + ".html");
            });
            planContents.append(entityDetails);
            for (var j = 0; j < 1; j++)
                entityDetails.append(document.createElement("br"));
            for (var j = 0; j < numberOfStars; j++) {
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
        }

    }
};