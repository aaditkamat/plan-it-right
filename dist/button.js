export function addButton(id, value, obj, planItems) {
    const button = document.createElement("a");
    const body = document.querySelector('div.row.justify-content-center');
    button.setAttribute('target', '_blank');
    button.id = id;
    button.className = 'download-buttons';
    button.innerText = value;
    button.style = "color: white";
    button.addEventListener("click", () => {
        if (typeof obj === 'object') {
            let cal = ics();
            let startDate = formOptions.departure;
            for (let i = 0; i < planItems.length; i++) {
                if (i === 0)
                    startDate = startDate.substr(3, 3) + startDate.substr(0, 3) + startDate.substr(6);
                if (planItems[i + 1] !== undefined) {
                    if (planItems[i].day === planItems[i + 1].day) {
                        cal.addEvent(planItems[i].name, '', planItems[i].address, startDate + " " + planItems[i].time, startDate + " " + planItems[i + 1].time);
                    }
                    else {
                        let endTimeHours = parseInt(planItems[i].time.substr(0, 2)), endTime = planItems[i].time;
                        if (endTimeHours < 12) {
                            endTimeHours++;
                            endTime = endTimeHours + endTime.substr(2);
                        }
                        else if (endTime.substr(6) === 'pm') {
                            endTime = '01:00 pm';
                        }
                        else {
                            endTime = '01:00 am';
                        }
                        cal.addEvent(planItems[i].name, '', planItems[i].address, startDate + " " + planItems[i].time, startDate + " " + endTime);
                        let exp = (parseInt(startDate.substr(3, 2)) + 1);
                        startDate = exp < 10 ? (startDate.substr(0, 3) + "0" + exp + startDate.substr(5)) : (startDate.substr(0, 3) + exp + startDate.substr(5));
                    }
                }
            }
            cal.download(`${formOptions.city} Itinerary`, '.ics');
        }
        else {
            html2canvas(body).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('', 'mm', [canvas.width, canvas.height]);
                pdf.addImage(imgData, 'png', 0, 0, canvas.width, canvas.height);
                pdf.save(`${obj} Trip Itinerary.pdf`);
            });

        }
    });
    body.append(button);
}