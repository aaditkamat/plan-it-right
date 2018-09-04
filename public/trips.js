firebase.auth().onAuthStateChanged((user) => {
    sessionStorage.clear();
    let database = firebase.database();
    database.ref('users/' + user.uid).once('value').then((snapshot) => {
        const data = snapshot.val(), body = document.querySelector('body > section > div');
        let ctr = 1;
        for (value in data) {
            let detail = data[value];
            const startTime = detail.departure,
                endTime = moment(moment(startTime).format("DD/MM/YYYY")).add(detail.lengthOfTrip - 1, "days").format("DD/MM/YYYY");
            const duration = `${detail.lengthOfTrip} days in ${detail.city}`, dateSpan = `${startTime} - ${endTime}`;
            const imageSrc = `images/destinations/${detail.city}.jpg`;
            console.log(startTime);
            if (ctr === 1) {
                document.querySelector('img.background').src = imageSrc;
                document.querySelector('div.duration').innerText = duration;
                document.querySelector('div.date-span').innerText = dateSpan;
            }
            else {
                const tripBox = document.querySelector('div.trip').cloneNode(true);
                const info = tripBox.children[1];
                info.children[0].innerText = duration;
                info.children[1].innerText = dateSpan;
                tripBox.children[0].src = imageSrc;
                body.append(tripBox);
            }
            ctr++;
        }
    });
});
