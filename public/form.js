var controlCalendarDisplay = (calendar, calendarOpen) => {
    if (calendarOpen === false)
        calendar.style.display = "block";
    else
        calendar.style.display = "none";
    calendarOpen = !calendarOpen;
};

/**
 * This function controls the display of calendar.
 */
var displayCalendar = () => {
    var firstCalendarOpen = true, secondCalendarOpen = true;
    const firstCalendarIcon = document.querySelectorAll("img.calendarIcon")[0], secondCalendarIcon = document.querySelectorAll("img.calendarIcon")[1];
    const firstCalendar = document.getElementById('dycalendar-month-with-skin-shadow'), secondCalendar = document.getElementById('secondCalendar');
    firstCalendarIcon.addEventListener("click", controlCalendarDisplay(firstCalendar, firstCalendarOpen));
    secondCalendarIcon.addEventListener("click", controlCalendarDisplay(secondCalendar, secondCalendarOpen));
};



/**
 * This function validates the form input.
 */
var validateFormInput = () => {
    const submitButton = document.querySelector(`input[value="Submit Booking Form"]`);
    const cityInput = document.querySelector('input[name=city]'), countryInput = document.getElementById('country_options');
    submitButton.addEventListener("click", function() {
    if (checkLocation(cityInput, countryInput) && checkDeparture() && checkReturn() && checkGuests())
        window.open(cityInput.value.toLowerCase() + "-trip.html");
    });
};


var setRedBorder = (element) => {
    element.style.border="1px solid red";
};

var hasRedBorder = (element) => {
    return element.style.border === "1px solid red";
};

var unsetRedBorder = (element) => {
    element.style.border="";
};

var checkDateFormat = (type) => {
    const input = document.querySelector(`input[name=${type}]`); 
    removeRedundantWarning(type);
    if (!moment(input.value, 'YYYY/MM/DD', true).isValid()) {
        setRedBorder(input);
        addWarning(type, 'Fill date according to the format: YYYY/MM/DD');
    }
    else if (hasRedBorder(input))
        unsetRedBorder(input);
    return moment(input.value, 'YYYY/MM/DD', true).isValid();
};

var checkDateBefore = (firstType, secondType) => {
    const firstInput = document.querySelector(`input[name=${firstType}]`), secondInput = document.querySelector(`input[name=${secondType}]`);
    removeRedundantWarning(firstType);
    if (firstInput.value < secondInput.value) {
        setRedBorder(firstInput);
        addWarning(firstType, 'Return date must be after Departure Date');
    }
    else {
        unsetRedBorder(firstInput);
    }
    return firstInput.value >= secondInput.value;
};

var checkDeparture = () => {
    return checkDateFormat('departure');
};

var checkReturn = () => {
    return checkDateFormat('return') && checkDateBefore('return', 'departure');
};

var checkGuests = () => {
    const guestsInput = document.querySelector("input[name=guests]");
    removeRedundantWarning('guests');
    if (isNaN(parseInt(guestsInput.value))) {
        setRedBorder(guestsInput);
        addWarning('guests', 'Number of guests must be filled');
    }
    else if (hasRedBorder(guestsInput))
        unsetRedBorder(guestsInput);
    return !isNaN(parseInt(guestsInput.value));
};

var checkLocation = (cityInput, countryInput) => {
    let cityOptionSelected = false, cityOptionSelectedCorrectly = false;
    for (let i = 0; i < data.length; i++) {
        if (cityInput.value === data[i].city) {
            cityOptionSelected = true;
            if (countryInput.value === data[i].country)
                cityOptionSelectedCorrectly = true;
        }
    }
    removeRedundantWarning('location');
    if (!cityOptionSelected || !cityOptionSelectedCorrectly) {
        setRedBorder(cityInput);
        if (!cityOptionSelected) 
            addWarning('location', 'City Option must be filled');
        else
            addWarning('location', 'Selected city and country do not match');
    }
    if (cityOptionSelectedCorrectly && hasRedBorder(cityInput)) {
        unsetRedBorder(cityInput);
    }
    return cityOptionSelectedCorrectly;
};

var removeRedundantWarning = (type) => {
    const label = document.querySelector(`.form-label#${type}-label`);
    if (label.childNodes[1] != undefined)
        label.removeChild(label.childNodes[1]);
};

var addWarning = (type, message) => {
    const label = document.querySelector(`.form-label#${type}-label`);
    label.innerHTML+= `<span class="warning">${message}</span>`;
};

displayCalendar();
validateFormInput();
