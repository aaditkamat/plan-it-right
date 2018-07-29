scheduler.init("scheduler_here", new Date(), "month");
var data = JSON.parse(sessionStorage.getItem('data')), planItems = data.first, events = [];
document.title = data.second.city + " Trip Calendar";
for (let i = 0; i < planItems.length; i++) {
    if (planItems[i].city === data.second.city) {
        var event = {id: 0, text: "", start_date: "", end_date: ""};
        event.id = i + 1;
        event.text = planItems[i].name;
        if (data.second !== null)
            var startDate = data.second.departure, year = startDate.split("/")[0], month = startDate.split("/")[1],
                day = startDate.split("/")[2];
        else
            startDate = data.first.startDate, year = startDate.split("-")[0], month = startDate.split("-")[1],
                day = startDate.split("-")[2];
        event.start_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " " + planItems[i].time;
        console.log(event.start_date);
        if (i < planItems.length - 1)
            event.end_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " " + planItems[i + 1].time;
        else
            event.end_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " 8:00pm";
        events.push(event);
    }
}
scheduler.parse(events, "json");