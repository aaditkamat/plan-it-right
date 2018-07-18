const fs = require('fs');
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var shuffle = require('shuffle-array');
fs.readFile('public/cities.json', 'utf-8', (err, data) => {
    if (err) throw err;
    var array = JSON.parse(data);
    var countries = [];
    for (var i = 0; i < array.length; i++) {
        countries.push(array[i].name);
    }
    countries.sort();
    var groups = [], ctr = 0, groupNo = 0;
    for (var i = 0; i < 26; i++)
        groups.push([]);
    for (var i = 0; i < countries.length; i++) {
        ctr++;
        if (ctr >= 30) {
            var result = checkCountry(countries[i], letters[groupNo + 1]);
            if (result === true) {
                groups[groupNo++].push(countries[i]);
                ctr = 0;
            }

        } 
        else {
            groups[groupNo].push(countries[i]);
        }
    }
    var bool_array = [];
    for (var i = 0; i < groups.length; i++) {
        bool_array.push(groups[i].find((country) => {
            return country === "Singapore";
        }));
    }
    var found = bool_array.find((value) => {
        return value === true;
    });
    if (found === true)
        console.log("Singapore found in the list of cities");
    else
        console.log("Singapore not found in the list of cities");
});

checkCountry = (country, letter) => {
    if (country[0] === letter)
        return true;
    return false;
};