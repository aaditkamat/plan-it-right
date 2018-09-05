firebase.auth().onAuthStateChanged((user) => {
    sessionStorage.clear();
    let database = firebase.database();
    database.ref('users/' + user.uid).once('value').then((snapshot) => {
        const data = snapshot.val(), body = document.querySelector('body > section > div');
        let ctr = 1;
        for (value in data) {
            let detail = data[value];
            detail.ctr = ctr;
            const startTime = detail.departure,
                endTime = moment(moment(startTime).format("DD/MM/YYYY")).add(detail.lengthOfTrip - 1, "days").format("DD/MM/YYYY");
            const duration = `${detail.lengthOfTrip} days in ${detail.city}`, dateSpan = `${startTime} - ${endTime}`;
            const imageSrc = `images/destinations/${detail.city}.jpg`;
            if (ctr === 1) {
                document.querySelector('.destination-image').src = imageSrc;
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
        ctr = 1;
        let arr = [];
        for (let image of document.querySelectorAll('.destination-image')) {
            arr.push({ctr: ctr++, image: image});
            image.onclick = () => {
                sessionStorage.clear();
                for (value in data) {
                    let detail = data[value];
                    for (let item of  arr) {
                        console.log(item.ctr + " " + detail.ctr);
                        if (item.image === image && item.ctr === detail.ctr) {
                            sessionStorage.setItem('formOptions', JSON.stringify(detail));
                            break;
                        }
                    }
                }
                window.open('result-copy.html');
            }
        }
        console.log(arr);
    });
});
