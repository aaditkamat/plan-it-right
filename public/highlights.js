//highlights of the trip
const Nightmare = require('nightmare');
const fs = require('fs');

function scrape() {
    const startDate = process.argv[2]; // to be inputted by user
    const endDate = process.argv[3]; // to be inputted by user
    const city = process.argv[4]; // to be inputted by user
    const features = process.argv[7]; // to be inputted by user = ['family_kids', 'food_drink', 'sight_landmark', 'park_nature', 'museum', 'shopping',
    //                           'couple_romantic','outdoor', 'history_culture', 'beach', 'nightlife', 'show_concert', ''    ]
    const pace = process.argv[6] || 'medium'; // to be inputted by user
    const country = process.argv[5];

    let url = `https://tripplannera.com/suggest-itinerary/${country}-${city}/${startDate}/${endDate}?pace=${pace}`;
    for (let i = 0; i < features.length; i++) {
        url += `&${features[i]}=1`;
    }
    const path = './highlights.txt';

    const nightmare = Nightmare({show: false});

    nightmare.goto(url)
        .evaluate(() => document.querySelector('.highlights-wrapper').innerText)
        .end()
        .then((result) => fs.writeFile(path, result, function (err) {
            if (err)
                console.log('error: ' + err);
            else
                console.log(result);
        }))
        .catch((error) => console.log(error));
}

scrape();
