scheduler.init("scheduler_here", new Date(), "month");
var data = JSON.parse(sessionStorage.getItem('data')), planItems = data.first.planItems, events = [];
for (let i = 0; i < planItems.length; i++) {
    var event = {id: 0, text: "", start_date: "", end_date: ""};
    event.id = i + 1;
    event.text = planItems[i].entity.name;
    if (data.second !== null)
        var startDate = data.second.departure, year = startDate.split("/")[0], month = startDate.split("/")[1],
            day = startDate.split("/")[2];
    else
        startDate = data.first.startDate, year = startDate.split("-")[0], month = startDate.split("-")[1],
            day = startDate.split("-")[2];
    document.title = data.first.name.split(" in ")[1] + " Itinerary";
    event.start_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " " + planItems[i].startTime;
    event.end_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " " + planItems[i].endTime;
    events.push(event);
}
scheduler.parse(events, "json");