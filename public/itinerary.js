var data_url = 'https://api.myjson.com/bins/930uk';
request = new XMLHttpRequest();
data = null;
var itinerary_area = document.getElementsByClassName("row justify-content-center")[0];

request.open('GET', data_url);
request.responseType = 'json';
request.send();
request.onload = function() {
    data = request.response;
    //edit_title();
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
        itinerary_area.append(plan);  
        if (day === 1)
          plan.style="margin-top:120px;";
        itinerary_area.append(document.createElement("br"));
        var dayText = document.createElement("h2");
        dayText.innerText = "Day " + day;
        plan.append(dayText);
        create_plan(plan, day);
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

create_plan = function(plan, day) {
    var planItems = data.planItems;
    for (var i = 0; i < planItems.length; i++) {
        var entityDetails = document.createElement("div");
        entityDetails.className = "entityDetails";
        var horizontalSection = document.createElement("div");
        horizontalSection.className = "horizontal_section";
        var entityName = document.createElement("h3");
        entityName.id = "entityName";
        var entityTime = document.createElement("h4");
        entityTime.id = "entityTime";
        var circle = document.createElement("img");
        circle.src = "http://man.hubwiz.com/docset/SVG.docset/Contents/Resources/Documents/mdn.mozillademos.org/files/7707/circle2.svg";       
        circle.width = "100px"; 
        var image = document.createElement("img");
        var starSection = document.createElement("div");
        starSection.className = "star_section";
        var numberOfStars = null;

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
            image.src = get_image_url(name);
            numberOfStars = planItems[i].entity.rating;
        }

        if (numberOfStars != null) {
            horizontalSection.append(entityTime);
            horizontalSection.append(entityName);
            entityDetails.append(horizontalSection);
            //entityDetails.append(image);
            plan.append(horizontalSection);
            plan.append(entityDetails);
            for (var j = 0; j < 1; j++)
                entityDetails.append(document.createElement("br"));
            entityDetails.append(starSection);
            for (var j = 0; j < numberOfStars; j++) {
                var starDiv = document.createElement("div");   
                starDiv.style.float="left";
                starDiv.style.marginLeft="5px";
                var star = document.createElement("span");
                star.innerHTML = "&starf;";
                star.style.fontSize = "200%";
                star.style.color="yellow";
                starDiv.appendChild(star);
                starSection.appendChild(starDiv);
            }
        }

    }
}