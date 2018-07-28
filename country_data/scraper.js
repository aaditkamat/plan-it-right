urls = ['./singapore.html', './kualalumpur.html'];
jsons = [];

//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
const generateRandomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const run = () => {
    for (let url of urls) {
        let json = {
            "id": generateRandomString(),
            "name": "",
            "categoriesTitles": "",
            "description": "",
            "daysCount": 0,
            "startDate": "",
            "endDate": "",
            "planItems": [],
        };
    }
};
run();
