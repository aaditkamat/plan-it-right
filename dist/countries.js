const data = [{city: "Singapore", country: "Singapore"},
    {city: "Naypyidaw", country: "Myanmar"},
    {city: "Ho Chi Minh", country: "Vietnam"},
    {city: "Kuala Lumpur", country: "Malaysia"},
    {city: "Phnom Penh", country: "Cambodia"},
    {city: "Bangkok", country: "Thailand"},
    {city: "Vientiane", country: "Laos"},
    {city: "Manila", country: "Philippines"},
    {city: "Jakarta", country: "Indonesia"},
    {city: "Bandar Seri Begawan", country: "Brunei"},
];
var array = [];
var dropdown = document.getElementById("country_options");
for (var i = 0; i < data.length; i++)
    array.push(data[i].country);
array.sort();
addOption(array, dropdown);

function addOption(array, dropdown) {
    for (var i = 0; i < array.length; i++) {
        var element = document.createElement('option');
        element.value = array[i];
        element.text = array[i];
        dropdown.appendChild(element);
    }
}