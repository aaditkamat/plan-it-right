export function addButton(id, value, obj, planItems) {
    const button = document.createElement("a");
    button.setAttribute('target', '_blank');
    button.id = id;
    button.className = 'download-buttons';
    button.innerText = value;
    button.style = "color: white";
    button.addEventListener("click", () => {
        sessionStorage.clear();
        if (typeof obj === 'object') {
            let cal = ics();
            let startDate = formOptions.departure;
            for (let i = 0; i < planItems.length; i++) {
                if (planItems[i + 1] !== undefined) {
                    if (planItems[i].day === planItems[i + 1].day)
                        cal.addEvent(planItems[i].name, '', planItems[i].address, startDate + " " + planItems[i].time, startDate + " " + planItems[i + 1].time);
                    else {
                        startDate = startDate.substr(0, 8) + (parseInt(startDate.substr(8)) + 1);
                        let endTimeHours = parseInt(planItems[i].time.substr(0, 2)), endTime = planItems[i].time;
                        if (endTimeHours <= 12) {
                            endTimeHours++;
                            endTime = endTimeHours + endTime.substr(2);
                        }
                        else if (endTime.substr(6) === 'pm') {
                            endTime = '01:00 am';
                        }
                        else {
                            endTime = '01:00 pm';
                        }
                        cal.addEvent(planItems[i].name, '', planItems[i].address, startDate + " " + planItems[i].time, startDate + " " + endTime);
                    }
                }
            }
            cal.download(`${formOptions.city} Itinerary`);
        }
        else {
            html2canvas(document.body).then((canvas) => {
                canvas.toBlob(function (blob) {
                    console.log(blob);
                    saveAs(blob, `${obj} Trip Itinerary.png`);
                });
            });
        }
    });
    document.querySelector(".justify-content-center").append(button);
}