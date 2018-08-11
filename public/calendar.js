scheduler.init("scheduler_here", new Date(), "month");
var data = JSON.parse(sessionStorage.getItem('data')), planItems = data.first, events = [];
document.title = data.second.city + " Trip Calendar";
var getLengthOfTrip = (data) => {
    return data.lengthOfTrip;
};
for (let i = 0; i < planItems.length; i++) {
    if (planItems[i].city === data.second.city && planItems[i].day <= getLengthOfTrip(data.second)) {
        var event = {id: 0, text: "", start_date: "", end_date: ""}, startDate;
        event.id = i + 1;
        event.text = planItems[i].name;
        if (data.second !== null) {
            if (data.second.departure !== '') {
                startDate = data.second.departure;
            }
            else {
                startDate = moment().format('YYYY/MM/DD');
            }
            var year = startDate.split("/")[0], month = startDate.split("/")[1], day = startDate.split("/")[2];
        }
        else {
            startDate = data.first.startDate, year = startDate.split("-")[0], month = startDate.split("-")[1],
                day = startDate.split("-")[2];
        }
        event.start_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " " + planItems[i].time;
        if (i < planItems.length - 1)
            event.end_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " " + planItems[i + 1].time;
        else
            event.end_date = month + "/" + (parseInt(day) + planItems[i].day - 1) + "/" + year + " 8:00pm";
        events.push(event);
    }
}
scheduler.parse(events, "json");
scheduler.exportToPDF();