firebase.auth().onAuthStateChanged((user) => {
    sessionStorage.clear();
    let database = firebase.database();
    database.ref('users/' + user.uid).once('value').then((snapshot) => {
        let data = snapshot.val(), ctr = 1;
        console.log(data);
        for (value in data) {
            let detail = data[value];
            const startTime = detail.departure, endTime = moment(startTime).add(detail.lengthOfTrip, "days").calendar();
            console.log(moment(startTime).add(detail.lengthOfTrip).calendar());
            if (ctr === 1) {
                document.querySelector('div.duration').innerText = `${detail.lengthOfTrip} days in ${detail.city}`;
                document.querySelector('div.date-span').innerText = `${startTime} - ${endTime}`;
            }
        }
    });
    $(".trip").on("click", () => console.log());
});
